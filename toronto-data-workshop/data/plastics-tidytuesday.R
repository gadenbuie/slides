library(readr)

plastics <- tidytuesdayR::tt_load(2021, week = 5)$plastics

dir.create(here::here("data"), showWarnings = FALSE)
write_csv(plastics, here::here("data", "plastics.csv"))
