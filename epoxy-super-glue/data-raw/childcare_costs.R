library(tidyverse)
library(tidytuesdayR)
library(fs)

if (!identical(here::here(), getwd())) {
  setwd(here::here())
}

path_data_raw <- function(...) {
  path(here::here(), "epoxy-super-glue", "data-raw", ...)
}

path_tuesdata <- path_data_raw("tuesdata.rds")

#  Load Data ---------------------------------------
if (!file_exists(path_tuesdata)) {
  tuesdata <- tidytuesdayR::tt_load(2023, week = 19)

  childcare_costs <- tuesdata$childcare_costs
  counties <- tuesdata$counties

  saveRDS(tuesdata, file = path_tuesdata)
} else {
  tuesdata <- readRDS(path_tuesdata)

  childcare_costs <- tuesdata$childcare_costs
  counties <- tuesdata$counties
}

# Prep childcare costs ---------------------------------------
childcare_step_1 <-
  childcare_costs |>
  filter(study_year == 2018, !is.na(mc_infant)) |>
  select(1:2, total_pop, mhi_2018, matches("mfcc|mc")) |>
  mutate(
    county_size = case_when(
      total_pop < 1e5 ~ "small",
      total_pop < 5e5 ~ "mid-sized",
      total_pop < 1e6 ~ "large",
      TRUE ~ "very large"
    ),
    county_size = fct_reorder(county_size, total_pop)
  )

childcare_step_2 <-
  childcare_step_1 |>
  pivot_longer(
    cols = matches("mfcc|mc"),
    names_to = c("type", "age"),
    names_pattern = "(mfcc|mc)(.*)",
    values_to = "cost"
  ) |>
  mutate(
    age = str_remove(age, "^_"),
    age = recode(age, sa = "school-age"),
    age = factor(age, c("infant", "toddler", "preschool", "school-age")),
    type = recode(type, mfcc = "home care", mc = "day care"),
    cost = cost * 52
  )

childcare_summary <-
  childcare_step_2 |>
  summarize(
    across(
      c(cost, mhi_2018, total_pop),
      \(x) median(x, na.rm = TRUE)
    ),
    n_counties = n(),
    .by = c(county_size, type, age)
  ) |>
  mutate(mhi_pct = cost / mhi_2018)

saveRDS(childcare_summary, file = path_data_raw("childcare_summary.rds"))


# Examples ---------------------------------------
childcare_summary |>
  filter(cost == max(cost))

costs_by_county_type_age <-
  childcare_summary |>
  group_by(county_size, type, age)

med_cost_max  <-
  costs_by_county_type_age |>
  summarize(across(cost, \(x) median(x, na.rm = TRUE))) |>
  filter(cost == max(cost)) |>
  pull(cost)

childcare_summary |>
  filter(cost == max(cost)) |>
  rename(max_med_cost = cost) |>
  as.list() |>
  map_if(is.factor, as.character) |>
  iwalk(function(val, var) {
    val <- capture.output(dput(val))
    cat(var, "<-", val, "\n")
  })

childcare_summary |>
  rename(
    max_med_cost = cost,
    county_pop_med = total_pop,
  ) |>
  slice_max(max_med_cost, n = 10) |>
  mutate(cost_rank = row_number(), .before = 1) |>
  mutate(across(where(is.factor), as.character)) |>
  write_rds(path_data_raw("childcare_summary_top_10.rds"))
