library(shiny)
library(plotly)
library(glue)
library(shinydashboard)

cities <- readRDS("data/cities.rds")

if (!exists("cities", globalenv())) {
  cities <- readRDS("data/cities.rds")

  INIT_LOCATION <- "Atlanta, Georgia"
  INIT_CITY <- find_location(INIT_LOCATION, cities)[1, ]
  INIT_LOCATION <- INIT_CITY$full_name
  INIT_WEATHER <- get_city_weather(INIT_CITY)
}

ui <- dashboardPage(
  dashboardHeader(
    title = "Jeep Weather Dashboard"
  ),
  dashboardSidebar(
    selectizeInput(
      "location",
      "Location",
      choices = INIT_LOCATION,
      selected = INIT_LOCATION,
      multiple = FALSE,
      width = "100%"
    ),
    checkboxInput("celsius", "Use celsius", value = FALSE)
  ),
  dashboardBody(
    fluidRow(
      valueBoxOutput("day1"),
      valueBoxOutput("day2"),
      valueBoxOutput("day3")
    ),
    fluidRow(
      valueBoxOutput("temp_day1"),
      valueBoxOutput("temp_day2"),
      valueBoxOutput("temp_day3")
    ),
    fluidRow(
      box(
        title = "Temperature Forecast",
        status = "primary",
        collapsible = TRUE,
        width = 6,
        plotlyOutput("temp_hourly")
      ),
      box(
        title = "Cloud Conditions",
        collapsible = TRUE,
        width = 6,
        plotlyOutput("cloud_hourly")
      )
    )
  )
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
  deg <- reactiveVal("F")

  observeEvent(input$location, {
    req(input$location)
    location(input$location)
    if (grepl("United States", input$location)) {
      updateCheckboxInput(session, "celsius", value = FALSE)
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

  # Forecast Summary Value Boxes ----
  lapply(1:3, function(i) {
    output[[paste0("day", i)]] <- renderValueBox({
      valueBox(
        value = forecast()$description[[i]],
        subtitle = strftime(forecast()$day[i], "%A"),
        color = "purple",
        icon = tags$i(img(src = forecast()$image[i], alt = "", style = "opacity: 0.66;"))
      )
    })
  })

  # Temperature Summary Boxes ----
  describe_temp <- function(x, is_celsius = FALSE) {
    x <- round(x, 0)
    if (is_celsius) {
      if      (x < 11) "freezing"
      else if (x < 16) "cold"
      else if (x < 21) "cool"
      else if (x < 26) "pleasant"
      else if (x < 31) "warm"
      else "hot"
    } else {
      if      (x < 40) "freezing"
      else if (x < 60) "cold"
      else if (x < 70) "cool"
      else if (x < 80) "pleasant"
      else if (x < 90) "warm"
      else "hot"
    }
  }

  temp_icon <- function(desc) {
    switch(
      desc,
      "freezing" = "temperature-empty",
      "cold" = "temperature-low",
      "cool" = "temperature-quarter",
      "pleasant" = "temperature-half",
      "warm" = "temperature-three-quarters",
      "hot" = "temperature-full"
    )
  }

  temp_color <- function(desc) {
    switch(
      desc,
      "freezing" = "blue",
      "cold" = "light-blue",
      "cool" = "aqua",
      "pleasant" = "teal",
      "warm" = "orange",
      "hot" = "red"
    )
  }

  lapply(1:3, function(i) {
    output[[paste0("temp_day", i)]] <- renderValueBox({
      temp_desc <- describe_temp(forecast()$temp_mean[i], input$celsius)

      temp_fmt <- switch(
        deg(),
        "F" = "%0.0f\u00baF",
        "C" = "%0.1f\u00baC"
      )

      valueBox(
        value = sprintf(temp_fmt, forecast()$temp_mean[i]),
        subtitle = sprintf("L:%0.0f H:%0.0f", forecast()$temp_low[i], forecast()$temp_high[i]),
        color = temp_color(temp_desc),
        icon = icon(temp_icon(temp_desc))
      )
    })
  })

  output$temp_hourly <- renderPlotly({
    req(weather())

    plotly_sparkline(
      x = weather()$hourly$time,
      y = weather()$hourly$temperature_2m,
      y_title = glue("Temperature (\u00ba{deg()})"),
      color = getCurrentOutputInfo()$accent()
    )
  })

  output$cloud_hourly <- renderPlotly({
    req(weather())

    plotly_sparkline(
      x = weather()$hourly$time,
      y = weather()$hourly$cloud_cover,
      y_title = "Cloud Cover (%)",
      color = getCurrentOutputInfo()$fg()
    )
  })
}

shinyApp(ui, server)
