# Setup ---------------------------------------
library(shiny)
library(bslib)
library(plotly, warn.conflicts = FALSE)
library(lubridate)
library(htmltools)

cities <- readRDS("data/cities.rds")

INIT_LOCATION <- "Atlanta, Georgia"
INIT_CITY <- find_location(INIT_LOCATION, cities)[1, ]
INIT_LOCATION <- INIT_CITY$full_name
INIT_WEATHER <- get_city_weather(INIT_CITY)

# Modules ---------------------------------------
# ---- > Forecast value box ----
ui_forecast_value_box <- function(id) {
  ns <- NS(id)

  value_box(
    title = textOutput(ns("wday")),
    value = uiOutput(ns("weather")),
    showcase = uiOutput(ns("icon")),
    showcase_layout = "top right",
    theme = "bg-gradient-blue-purple"
  )
}

server_forecast_value_box <- function(id, forecast, day = 1) {
  moduleServer(id, function(input, output, session, ...) {
    output$wday <- renderText({
      strftime(forecast()$day[day], "%A")
    })

    output$weather <- renderUI({
      forecast()$description[day]
    })

    output$icon <- renderUI({
      img(src = forecast()$image[day], alt = "")
    })

  })
}

# ---- > Temperature value box ----
ui_temp_value_box <- function(id) {
  ns <- NS(id)

  value_box(
    title = textOutput(ns("wday")),
    value = textOutput(ns("mean")),
    textOutput(ns("range")),
    showcase = plotlyOutput(ns("plot")),
    showcase_layout = "bottom"
  )
}

server_temp_value_box <- function(id, weather, forecast, deg, day = 1) {
  moduleServer(id, function(input, output, session, ...) {
    output$wday <- renderText({
      strftime(forecast()$day[day], "%A")
    })

    output$mean <- renderText({
      temp_fmt <- switch(deg(), "F" = "%0.0f\u00baF", "C" = "%0.1f\u00baC")
      sprintf(temp_fmt, forecast()$temp_mean[day])
    })

    output$range <- renderText({
      sprintf("L:%0.0f H:%0.0f", forecast()$temp_low[day], forecast()$temp_high[day])
    })

    output$plot <- renderPlotly({
      req(forecast())

      hourly <- weather()$hourly

      temps <- hourly[floor_date(hourly$time, "day") == forecast()$day[day], ]

      plotly_sparkline(
        temps$time,
        temps$temperature_2m,
        y_title = sprintf("Temperature (\u00ba%s)", deg()),
        color = getCurrentOutputInfo()$accent()
      )
    })
  })
}

ui <- page_sidebar(
  title = "Jeep Weather Dashboard",
  class = "bslib-page-dashboard",
  # ---- Sidebar -----
  sidebar = sidebar(
    title = "Settings",
    width = "325px",
    accordion(
      accordion_panel(
        "Location",
        icon = bsicons::bs_icon("geo-alt-fill"),
        selectizeInput(
          "location",
          "Location",
          choices = INIT_LOCATION,
          selected = INIT_LOCATION,
          multiple = FALSE,
          width = "100%"
        ),
        input_switch("celsius", "Use celsius", value = FALSE),
      ),
      accordion_panel(
        "Theme",
        icon = bsicons::bs_icon("palette-fill"),
        selectizeInput(
          "theme",
          "Theme",
          selected = "shiny",
          choices = list(
            "bslib" = list("shiny"),
            "Bootswatch" = bootswatch_themes(5)
          )
        ),
        input_dark_mode(),
      )
    ),
  ),
  # ---- Main Area ----
  # ---- > Forecast Summary ----
  layout_columns(
    min_height = 150,
    ui_forecast_value_box("day1"),
    ui_forecast_value_box("day2"),
    ui_forecast_value_box("day3"),
  ),
  # ---- > Temperature Summary ----
  layout_columns(
    min_height = 225,
    ui_temp_value_box("temp_day1"),
    ui_temp_value_box("temp_day2"),
    ui_temp_value_box("temp_day3")
  ),
  # ---- > Cloud Cover ----
  value_box(
    title = "Cloud Cover",
    value = NULL,
    showcase_layout = showcase_bottom(max_height_full_screen = "400px"),
    showcase = plotlyOutput("cloud_cover_plot"),
    full_screen = TRUE,
    min_height = 100
  ),
  # ---- > Hourly Conditions ----
  card(
    class = "text-bg-dark",
    card_header("Hourly Conditions", class = "text-bg-dark"),
    card_body(
      uiOutput("hourly_conditions", fill = TRUE, class = "table-responsive"),
      padding = 0
    ),
    height = 300,
    min_height = 300,
  ),
  # ---- > Small style adjustments ----
  tags$style(HTML(
    ".table-sticky-column-1 > * > tr > :first-child {
      position:  sticky;
      left: 0;
      background-color: var(--bs-dark);
    }

    @media (min-width: 576px) {
      .bslib-page-sidebar > .bslib-sidebar-layout.html-fill-item > .main {
        min-width: max(576px, 100%);
      }
    }

    .bslib-value-box.showcase-top-right .value-box-grid .value-box-area {
      grid-column: 1 / 3;
    }

    .bslib-value-box .value-box-value {
      font-size: calc(1rem + 3cqi);
    }"
  ))
)

# Server ---------------------------------------
server <- function(input, output, session) {

  # ---- > Setup ----
  observe({
    updateSelectizeInput(
      session,
      "location",
      selected = INIT_LOCATION,
      choices = cities$full_name,
      server = TRUE
    )
  })

  observeEvent(input$theme, {
    session$setCurrentTheme(
      bs_theme(5, preset = input$theme)
    )
  }, ignoreInit = TRUE)

  # ---- > Weather and Location ----
  location <- reactiveVal(INIT_LOCATION)
  deg <- reactiveVal("F")

  observeEvent(input$location, {
    req(input$location)
    location(input$location)
    if (grepl("United States", input$location)) {
      toggle_switch("celsius", value = FALSE)
    }
  })

  weather <- reactive({
    city <- cities[cities$full_name == location(), ]
    w <- get_city_weather(city)

    if (input$celsius) {
      w$hourly$temperature_2m <- to_celsius(w$hourly$temperature_2m)
      deg("C")
    } else {
      deg("F")
    }

    w
  })

  forecast <- reactive({
    req(weather())

    summarize_daytime_weather(weather())
  })

  # ---- > Forecast value boxes ----
  server_forecast_value_box("day1", forecast, day = 1)
  server_forecast_value_box("day2", forecast, day = 2)
  server_forecast_value_box("day3", forecast, day = 3)

  # ---- > Temperature value boxes ----
  server_temp_value_box("temp_day1", weather, forecast, deg, day = 1)
  server_temp_value_box("temp_day2", weather, forecast, deg, day = 2)
  server_temp_value_box("temp_day3", weather, forecast, deg, day = 3)

  # ---- > Cloud Cover Plot ----
  output$cloud_cover_plot <- renderPlotly({
    req(weather())

    hourly <- weather()$hourly

    plotly_sparkline(
      hourly$time,
      hourly$cloud_cover,
      y_title = "Cloud Cover (%)",
      color = getCurrentOutputInfo()$fg()
    )
  })

  # ---- > Hourly Conditions Table ----
  output$hourly_conditions <- renderUI({
    req(weather())

    conditions <- summarize_conditions(weather(), FALSE)

    conditions$cell <- purrr::pmap_chr(conditions, function(description, image, ...) {
      tooltip(
        img(src = image, alt = description, width = "40px", height = "40px"),
        description
      ) |>
        format()
    })

    conditions[c("day", "hour", "cell")] |>
      dplyr::rename(`Hour` = day) |>
      tidyr::pivot_wider(names_from = hour, values_from = cell, values_fill = "") |>
      knitr::kable(
        format = "html",
        escape = FALSE,
        align = "c",
        table.attr = paste0(
          'class="table table-sm table-sticky-column-1 table-striped-columns align-middle h-100 m-0"',
          'style="',
          css(
            "--bs-table-bg" = "inherit",
            "--bs-table-color" = "inherit",
            "--bs-table-striped-color" = "inherit",
            "--bs-table-striped-bg" = "rgba(var(--bs-body-bg-rgb), 0.1)"
          ),
          '"'
        )
      ) |>
      HTML()
  })
}

shinyApp(ui, server)
