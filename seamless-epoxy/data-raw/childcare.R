# All packages used in this script:
library(tidyverse)
library(here)
library(withr)

url <- "https://www.dol.gov/sites/dolgov/files/WB/media/nationaldatabaseofchildcareprices.xlsx"
temp_xlsx <- withr::local_tempfile(fileext = ".xlsx")
download.file(url, temp_xlsx, mode = "wb")

childcare_costs_raw <-
  readxl::read_xlsx(temp_xlsx) |>
  janitor::clean_names() |>
  # There are 15 constant columns. Get rid of those.
  janitor::remove_constant(quiet = FALSE)

# The file is very large, but it contains a lot of duplicate data. Extract
# duplications into their own tables.
counties <-
  childcare_costs_raw |>
  distinct(county_fips = county_fips_code, county_name, state_name, state_abbreviation)

childcare_costs <-
  childcare_costs_raw |>
	rename(county_fips = county_fips_code) |>
  select(
    -county_name,
    -state_name,
    -state_abbreviation,
    # Original data also contained unadjusted + adjusted dollars, let's just
    # keep the 2018 adjustments.
    -mhi, -me, -fme, -mme,
    # A number of columns have fine-grained breakdowns by age, and then also
    # broader categories. Let's only keep the categories ("infant" vs 0-5
    # months, 6-11 monts, etc)
    -ends_with("bto5"), -ends_with("6to11"), -ends_with("12to17"),
    -ends_with("18to23"), -ends_with("24to29"), -ends_with("30to35"),
    -ends_with("36to41"), -ends_with("42to47"), -ends_with("48to53"),
    -ends_with("54to_sa"),
    # Since we aren't worrying about the unaggregated columns, we can ignore the
    # flags indicating how those columns were aggregated into the combined
    # columns.
    -ends_with("_flag"),
    # Original data has both median and 75th percentile for a number of columns.
    # We'll simplify.
    -starts_with("x75"),
    # While important for wider research, we don't need to keep the (many)
    # variables describing whether certain data was imputed.
    -starts_with("i_")
  )

# readr::write_csv(
#   childcare_costs,
#   here::here(
#     "data",
#     "2023",
#     "2023-05-09",
#     "childcare_costs.csv"
#   )
# )

# readr::write_csv(
#   counties,
#   here::here(
#     "data",
#     "2023",
#     "2023-05-09",
#     "counties.csv"
#   )
# )
