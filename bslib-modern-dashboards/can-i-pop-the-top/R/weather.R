get_weather_forecast <- memoise::memoise(
  cache = cachem::cache_disk(".weather", max_age = 12 * 3600),
  function(lat, lon, timezone) {
    url <- sprintf(
      "https://api.open-meteo.com/v1/forecast?latitude=%s9&longitude=%s&hourly=temperature_2m,weather_code,cloud_cover&daily=sunrise,sunset,precipitation_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=%s&forecast_days=3",
      as.character(lat),
      as.character(lon),
      URLencode(timezone, reserved = TRUE)
    )

    jsonlite::fromJSON(url)
  }
)

find_city_name <- function(search, city_names) {
  search <- tolower(search)

  found <- city_names[agrepl(search, tolower(city_names), fixed = TRUE)]
  if (length(found) == 0) return(found)

  exact <- found[grepl(search, tolower(found), fixed = TRUE)]
  others <- setdiff(found, exact)

  if (length(exact)) {
    exact <- exact[order(adist(search, tolower(exact), fixed = TRUE))]
  }
  if (length(others)) {
    others <- others[order(adist(search, tolower(others), fixed = TRUE))]
  }

  c(exact, others)
}

find_location <- function(search, cities) {
  found_city <- find_city_name(search, cities$full_name)
  if (length(found_city) == 0) return(NULL)

  found <- cities[cities$full_name %in% found_city, ]
  found[match(found_city, found$full_name), ]
}

read_weather_codes <- memoise::memoise(function() {
  "https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c/raw/76b0cb0ef0bfd8a2ec988aa54e30ecd1b483495d/descriptions.json" |>
    jsonlite::fromJSON() |>
    purrr::map_depth(2, dplyr::as_tibble) |>
    purrr::map(\(x) purrr::list_rbind(x, names_to = "time_of_day")) |>
    purrr::list_rbind(names_to = "code")
})

read_weather_forecast <- function(lat = 33.75, lon = -84.38, timezone = "America/New_York") {
  res <- get_weather_forecast(lat, lon, timezone)

  res$hourly <-
    res$hourly |>
    dplyr::as_tibble() |>
    dplyr::mutate(time = lubridate::ymd_hm(time, tz = timezone))

  res$daily <-
    res$daily |>
    dplyr::as_tibble() |>
    dplyr::mutate(
      time = lubridate::ymd(time, tz = timezone),
      dplyr::across(c(sunrise, sunset), \(x) lubridate::ymd_hm(x, tz = timezone))
    )

  res
}

get_city_weather <- function(city) {
  weather <- read_weather_forecast(city$latitude, city$longitude, city$timezone)
  weather$city <- city

  weather
}

filter_daytime_hours <- function(weather) {
  weather$hourly |>
    dplyr::mutate(day = lubridate::as_date(time)) |>
    dplyr::left_join(
      weather$daily[c("time", "sunrise", "sunset")],
      by = c("day" = "time")
    ) |>
    dplyr::filter(dplyr::between(time, sunrise, sunset))
}

summarize_daytime_weather <- function(weather) {
  hourly <- filter_daytime_hours(weather)

  hourly |>
    dplyr::summarize(
      hours = dplyr::n(),
      temp_low = min(temperature_2m),
      temp_mean = mean(temperature_2m),
      temp_high = max(temperature_2m),
      temp_gt_75 = sum(temperature_2m > 75),
      cloudy = sum(cloud_cover > 50),
      weather = names(table(weather_code))[which.max(table(weather_code))],
      inclement_weather = sum(weather_code > 10),
      .by = day
    ) |>
    dplyr::left_join(
      read_weather_codes() |> dplyr::filter(time_of_day == "day"),
      by = c("weather" = "code")
    )
}

summarize_conditions <- function(weather, filter_daytime = TRUE) {
  hourly <-
    if (filter_daytime) {
      filter_daytime_hours(weather)
    } else {
      weather$hourly
    }

  hourly |>
    dplyr::mutate(weather_code = as.character(weather_code)) |>
    dplyr::left_join(
      read_weather_codes() |> dplyr::filter(time_of_day == "day"),
      by = c("weather_code" = "code")
    ) |>
    dplyr::mutate(
      day = strftime(time, "%A, %b %d"),
      hour = lubridate::hour(time),
    ) |>
    dplyr::select(day, hour, description, image)
}
