library(shiny)
library(bslib)
library(epoxy)
library(plotly, warn.conflicts = FALSE)
library(lubridate)

`%||%` <- function(a, b) if (!is.null(a)) a else b

cities <- readRDS("data/cities.rds")

INIT_LOCATION <- "Atlanta, Georgia"
INIT_CITY <- find_location(INIT_LOCATION, cities)[1, ]
INIT_LOCATION <- INIT_CITY$full_name
INIT_WEATHER <- get_city_weather(INIT_CITY)

ui <- page_sidebar(
  title = "Jeep Weather Dashboard",
  class = "bslib-page-dashboard",
  sidebar = sidebar(
    title = "Settings",
    width = "325px",
    selectizeInput(
      "location",
      "Location",
      choices = INIT_LOCATION,
      selected = INIT_LOCATION,
      multiple = FALSE,
      width = "100%"
    ),
    input_dark_mode(class = "position-absolute", style = "right: 1rem;")
  ),
  ui_epoxy_html(
    .id = "forecast",
    .class = "bslib-gap-spacing",
    .style = "display: contents;",
    layout_columns(
      min_height = 150,
      value_box(
        title = "{{ day1 }}",
        value = "{{ day1_forecast }}",
        showcase = "{{ !!day1_forecast_icon }}",
        showcase_layout = "top right",
        theme = "bg-gradient-blue-purple"
      ),
      value_box(
        title = "{{ day2 }}",
        value = "{{ day2_forecast }}",
        showcase = "{{ !!day2_forecast_icon }}",
        showcase_layout = "top right",
        theme = "bg-gradient-blue-purple"
      ),
      value_box(
        title = "{{ day3 }}",
        value = "{{ day3_forecast }}",
        showcase = "{{ !!day3_forecast_icon }}",
        showcase_layout = "top right",
        theme = "bg-gradient-blue-purple"
      )
    ),
    layout_columns(
      min_height = 225,
      value_box(
        "{{ day1 }}",
        "{{ day1_temp_mean }}",
        "{{ day1_temp_range }}",
        showcase_layout = "bottom",
        showcase = plotlyOutput("day1_temp_plot"),
        full_screen = TRUE
      ),
      value_box(
        "{{ day2 }}",
        "{{ day1_temp_mean }}",
        "{{ day1_temp_range }}",
        showcase_layout = "bottom",
        showcase = plotlyOutput("day2_temp_plot"),
        full_screen = TRUE
      ),
      value_box(
        "{{ day3 }}",
        "{{ day3_temp_mean }}",
        "{{ day3_temp_range }}",
        showcase_layout = "bottom",
        showcase = plotlyOutput("day3_temp_plot"),
        full_screen = TRUE
      )
    )
  ),
  value_box(
    title = "Cloud Cover",
    value = NULL,
    showcase_layout = showcase_bottom(max_height_full_screen = "400px"),
    showcase = plotlyOutput("cloud_cover_plot"),
    full_screen = TRUE,
    min_height = 150
  ),
  card(
    class = "text-bg-secondary",
    card_header("Hourly Conditions", class = "text-bg-dark"),
    card_body(
      uiOutput("hourly_conditions", fill = TRUE, class = "table-responsive"),
      padding = 0
    ),
    height = 300,
    min_height = 300,
  ),
  tags$style(HTML(
    ".table-sticky-column-1 > * > tr > :first-child {
      position:  sticky;
      left: 0;
      background-color: var(--bs-secondary);
    }"
  ))
)

server <- function(input, output, session) {
  observe({
    updateSelectizeInput(
      session,
      "location",
      selected = INIT_LOCATION,
      choices = cities$full_name,
      server = TRUE
    )
  })

  location <- reactiveVal(INIT_LOCATION)

  observeEvent(input$location, {
    req(input$location)
    location(input$location)
  })

  weather <- reactive({
    city <- cities[cities$full_name == location(), ]
    get_city_weather(city)
  })

  forecast <- reactive({
    req(weather())

    summarize_daytime_weather(weather())
  })

  value_box_data <- reactive({
    req(forecast())

    ret <- list()

    days <- strftime(forecast()$day, "%A")
    temp_range <- sprintf("L:%0.0f H:%0.0f", forecast()$temp_low, forecast()$temp_high)
    temp_mean <- sprintf("%0.0f\u00baF", forecast()$temp_mean)

    for (i in 1:3) {
      day <- paste0("day", i)
      ret[[day]] <- days[i]
      ret[[paste0(day, "_forecast")]] <- forecast()$description[i]
      ret[[paste0(day, "_forecast_icon")]] <- HTML(format(img(src = forecast()$image[i], alt = "")))
      ret[[paste0(day, "_temp_range")]] <- temp_range[i]
      ret[[paste0(day, "_temp_mean")]] <- temp_mean[i]
    }

    ret
  })

  output$forecast <- render_epoxy(.list = value_box_data())

  purrr::walk(1:3, function(i) {
    output[[paste0("day", i, "_temp_plot")]] <- renderPlotly({
      req(weather())
      req(forecast())

      hourly <- weather()$hourly

      temps <- hourly[floor_date(hourly$time, "day") == forecast()$day[i], ]

      plotly_sparkline(
        temps$time,
        temps$temperature_2m,
        color = getCurrentOutputInfo()$accent()
      )
    })
  })

  output$cloud_cover_plot <- renderPlotly({
    req(weather())

    hourly <- weather()$hourly

    plotly_sparkline(
      hourly$time,
      hourly$cloud_cover,
      x_axis = list(visible = FALSE, showgrid = FALSE, title = "Time of Day"),
      y_axis = list(visible = FALSE, showgrid = FALSE, title = "Cloud Cover (%)"),
      color = getCurrentOutputInfo()$fg()
    )
  })

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
        table.attr = paste(
          'class="table table-sm table-sticky-column-1 table-striped-columns align-middle h-100 m-0"',
          'style="--bs-table-bg: inherit; --bs-table-color: inherit; --bs-table-striped-color: inherit; --bs-table-striped-bg: rgba(var(--bs-body-bg-rgb), 0.1);"'
        )
      ) |>
      HTML()
  })
}

shinyApp(ui, server)
