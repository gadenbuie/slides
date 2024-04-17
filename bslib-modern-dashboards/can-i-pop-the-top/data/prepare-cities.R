library(dplyr)
library(readr)
library(dplyr)
library(tidyr)
library(withr)
library(zip)

tmpfile <- local_tempfile(fileext = ".zip")

download.file(
  "https://download.geonames.org/export/dump/cities15000.zip",
  tmpfile
)

tmpdir <- local_tempdir()
zip::unzip(tmpfile, exdir = tmpdir)

# geonameid         : integer id of record in geonames database
# name              : name of geographical point (utf8) varchar(200)
# asciiname         : name of geographical point in plain ascii characters, varchar(200)
# alternatenames    : alternatenames, comma separated, ascii names automatically transliterated, convenience attribute from alternatename table, varchar(10000)
# latitude          : latitude in decimal degrees (wgs84)
# longitude         : longitude in decimal degrees (wgs84)
# feature class     : see http://www.geonames.org/export/codes.html, char(1)
# feature code      : see http://www.geonames.org/export/codes.html, varchar(10)
# country code      : ISO-3166 2-letter country code, 2 characters
# cc2               : alternate country codes, comma separated, ISO-3166 2-letter country code, 200 characters
# admin1 code       : fipscode (subject to change to iso code), see exceptions below, see file admin1Codes.txt for display names of this code; varchar(20)
# admin2 code       : code for the second administrative division, a county in the US, see file admin2Codes.txt; varchar(80)
# admin3 code       : code for third level administrative division, varchar(20)
# admin4 code       : code for fourth level administrative division, varchar(20)
# population        : bigint (8 byte int)
# elevation         : in meters, integer
# dem               : digital elevation model, srtm3 or gtopo30, average elevation of 3''x3'' (ca 90mx90m) or 30''x30'' (ca 900mx900m) area in meters, integer. srtm processed by cgiar/ciat.
# timezone          : the iana timezone id (see file timeZone.txt) varchar(40)
# modification date : date of last modification in yyyy-MM-dd format

col_types <- cols(
  "geonameid" = col_integer(),
  "name" = col_character(),
  "asciiname" = col_character(),
  "alternatenames" = col_character(),
  "latitude" = col_double(),
  "longitude" = col_double(),
  "feature_class" = col_character(),
  "feature_code" = col_character(),
  "country_code" = col_character(),
  "cc2" = col_character(),
  "admin1_code" = col_character(),
  "admin2_code" = col_character(),
  "admin3_code" = col_character(),
  "admin4_code" = col_character(),
  "population" = col_integer(),
  "elevation" = col_character(),
  "dem" = col_character(),
  "timezone" = col_character(),
  "modification_date" = col_character()
)

cities_raw <-
  read_tsv(
    file.path(tmpdir, "cities15000.txt"),
    col_names = names(col_types$cols),
    col_types = col_types
  ) |>
  arrange(desc(population)) |>
  select(
    name = asciiname,
    admin1_code,
    country_code,
    latitude,
    longitude,
    timezone
  )

admin_codes <-
  read_tsv(
    "https://download.geonames.org/export/dump/admin1CodesASCII.txt",
    col_names = c("country_admin_code", "name", "asciiname", "population")
  ) |>
  separate(country_admin_code, into = c("country_code", "admin1_code"), sep = "\\.") |>
  select(-name, -population) |>
  rename(state = asciiname)


country_codes <-
  read_tsv(
    "https://download.geonames.org/export/dump/countryInfo.txt",
    skip = 49
  ) |>
  select(country_code = `#ISO`, country = Country)

cities <-
  cities_raw |>
  left_join(admin_codes, by = c("country_code", "admin1_code")) |>
  left_join(country_codes, by = "country_code") |>
  relocate(state, .before = admin1_code) |>
  relocate(country, .before = country_code) |>
  select(-ends_with("code")) |>
  rowwise() |>
  mutate(
    full_name = paste(unique(c(name, state, country)), collapse = ", "),
    .before = 1
  ) |>
  ungroup()

write_tsv(
  cities,
  here::here(
    "bslib-modern-dashboards",
    "can-i-pop-the-top",
    "data/cities.tsv"
  )
)

write_rds(
  cities,
  here::here(
    "bslib-modern-dashboards",
    "can-i-pop-the-top",
    "data/cities.rds"
  ),
  compress = "gz"
)

jsonlite::write_json(
  cities,
  here::here(
    "bslib-modern-dashboards",
    "can-i-pop-the-top",
    "data/cities.json"
  ),
  auto_unbox = TRUE,
  pretty = 2
)
