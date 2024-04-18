library(shiny)
library(bslib)
library(glue)
library(htmltools)

library(future)
library(promises)
future::plan(multisession)

`%||%` <- function(a, b) if (!is.null(a)) a else b

if (!exists("cities", globalenv())) {
  cities <- readRDS("data/cities.rds")

  INIT_LOCATION <- "Atlanta, Georgia"
  INIT_CITY <- find_location(INIT_LOCATION, cities)[1, ]
  INIT_LOCATION <- INIT_CITY$full_name
  INIT_WEATHER <- get_city_weather(INIT_CITY)
}

try_these <- list(
  atlanta = list(
    display = "Atlanta, GA",
    name = "Atlanta, Georgia, United States"
  ),
  yuma = list(
    display = "Yuma, AZ",
    name = "Yuma, Arizona, United States"
  ),
  seattle = list(
    display = "Seattle, WA",
    name = "Seattle, Washington, United States"
  ),
  lexington = list(
    display = "Lexington, KY",
    name = "Lexington, Kentucky, United States"
  ),
  wichita = list(
    display = "Wichita, KS",
    name = "Wichita, Kansas, United States"
  ),
  cuba = list(
    display = "Havana, Cuba",
    name = "Havana, Cuba"
  ),
  athens = list(
    display = "Athens, Greece",
    name = "Athens, Attica, Greece"
  ),
  warsaw = list(
    display = "Warsaw, Poland",
    name = "Warsaw, Mazovia, Poland"
  )
)

decide_to_pop_the_top <- function(forecast) {
  answer <- function(decision, reason, ...) {
    list(
      decision = decision,
      reason = reason,
      explanation = paste0(...)
    )
  }

  if (!all(forecast$temp_high[1:2] > 75)) {
    return(
      answer(
        "No",
        "It won't be warm enough.",
        "The next two days aren't both above 75ºF."
      )
    )
  }

  if (sum(forecast$inclement_weather[1:2]) > 2) {
    return(
      answer(
        "No",
        "There's bad weather in the forecast.",
        sum(forecast$inclement_weather[1:2]),
        " of the next ",
        sum(forecast$hours[1:2]),
        " daytime hours will have bad weather."
      )
    )
  }

  if (!all(forecast$temp_mean[1:2] > 70)) {
    return(
      answer(
        "No",
        "It won't be warm enough.",
        "The average temperature of the next two days isn't above 70ºF."
      )
    )
  }

  pct_cloudy <- sum(forecast$cloudy) / sum(forecast$hours)
  if (pct_cloudy > 0.66) {
    return(
      answer(
        "No",
        "It's going to be cloudy.",
        scales::percent(pct_cloudy, accuracy = 1),
        " of the next three days will be cloudy."
      )
    )
  }

  if (pct_cloudy > 0.5) {
    return(
      answer(
        "Maybe",
        "It might be kind of cloudy.",
        scales::percent(pct_cloudy, accuracy = 1),
        " of the next three days will be cloudy."
      )
    )
  }

  if (forecast$temp_high[3] < 75) {
    return(
      answer(
        "Maybe",
        "It might get cold soon.",
        "The high temperature on ",
        strftime(forecast$day[3], "%A"),
        " is ",
        forecast$temp_high[3],
        "ºF."
      )
    )
  }

  if (forecast$temp_mean[3] < 70) {
    return(
      answer(
        "Maybe",
        "It might get cold soon.",
        "The average temperature on ",
        strftime(forecast$day[3], "%A"),
        " is below 70ºF."
      )
    )
  }

  if (
    forecast$inclement_weather[3] > 0 &&
    forecast$inclement_weather[3] < (forecast$hours[3] * 0.5)
  ) {
    return(
      answer(
        "Maybe",
        "The weather could take a turn soon.",
        "Bad weather execpted for ",
        forecast$inclement_weather[3],
        " of ",
        forecast$hours[3],
        " daytime hours on ",
        strftime(forecast$day[3], "%A.")
      )
    )
  }

  # it's time to pop the top
  answer(
    "Yes",
    "Pop that top!",
    "It's going to be sunny and warm and dry."
  )
}

get_show_from_query <- function(url_search) {
  query <- parseQueryString(url_search)

  if (is.null(query$show) || query$show == "all") {
    return(list(title = TRUE, reason = TRUE, forecast = TRUE))
  }

  if (query$show == "none") {
    return(list(title = FALSE, reason = FALSE, forecast = FALSE))
  }

  show <- trimws(strsplit(query$show, ",")[[1]])

  list(
    title = "title" %in% show,
    reason = "reason" %in% show,
    forecast = "forecast" %in% show
  )
}

ui <- page_fillable(
  title = "Can I Pop the Top?",
  theme = bs_theme(
    version = 5,
    heading_font = font_google("Ultra"),
  ),
  padding = 0,
  gap = 0,
  style = "min-height: 666px",
  uiOutput("answer", fill = TRUE),
  input_dark_mode(id = "dark_mode", style = "display: none;")
)

server <- function(input, output, session) {
  location <- reactiveVal(INIT_LOCATION)

  observeEvent(input$save_location, {
    req(input$new_location)
    location(input$new_location)
  })

  weather <- reactive({
    city <- cities[cities$full_name == location(), ]
    w <- get_city_weather(city)
    removeModal()
    w
  }) |> bindEvent(location())

  forecast <- reactive({
    summarize_daytime_weather(weather())
  })

  observeEvent(input$show_location_modal, {
    showModal(
      modalDialog(
        selectizeInput(
          "new_location",
          "Where do you want to be today?",
          choices = INIT_LOCATION,
          selected = INIT_LOCATION,
          multiple = FALSE,
          width = "100%"
        ),
        p(
          class = "mt-4",
          "Try one of these cities:",
          br(),
          !!!unname(purrr::imap(try_these, function(value, key) {
            actionLink(
              paste0("try_", key),
              value$display,
              class = "text-nowrap",
              style = "margin-right: 0.5em;"
            )
          }))
        ),
        title = "Can I pop the top in ...?",
        footer = tagList(
          input_dark_mode(mode = input$dark_mode, style = "position: absolute; left: 1rem"),
          modalButton("Cancel"),
          input_task_button("save_location", "Get Forecast"),
        ),
        easyClose = TRUE
      )
    )

    updateSelectizeInput(
      session,
      "new_location",
      selected = input$new_location %||% INIT_LOCATION,
      choices = cities$full_name,
      server = TRUE
    )
  })

  purrr::iwalk(try_these, function(value, key) {
    observeEvent(input[[paste0("try_", key)]], {
      updateSelectizeInput(
        session,
        "new_location",
        selected = value$name,
        choices = cities$full_name,
        server = TRUE
      )
    })
  })

  show <- reactive(get_show_from_query(session$clientData$url_search))

  output$answer <- renderUI({
    req(forecast())

    answer <- decide_to_pop_the_top(forecast())
    city_name <- weather()$city$full_name

    answer_color <- switch(answer$decision,
      Yes = "success",
      Maybe = "warning",
      No = "danger"
    )

    size <- switch(answer$decision,
      Yes = "min(35vw, 50vh)",
      Maybe = "min(20vw, 50vh)",
      No = "min(46vw, 50vh)"
    )

    n_show <- sum(unlist(show()))

    div(
      class = "align-items-center",
      class = if (n_show < 3) "justify-content-center gap-4" else "justify-content-around",
      class = "h-100 p-2",
      class = glue("text-{answer_color}-emphasis bg-{answer_color}-subtle"),
      as_fill_carrier(),
      if (show()$title) {
        h1(
          actionLink(
            "show_location_modal",
            "Can I pop the top?",
            style = "color: inherit;"
          ),
          class = "pt-3 text-center w-100"
        )
      },
      h2(answer$decision, style = css(font_size = size)),
      if (show()$reason) {
        div(
          class = "text-center",
          style = css(
            width = "100%",
            max_width = "500px"
          ),
          strong(answer$reason),
          br(),
          answer$explanation
        )
      },
      if (show()$forecast) {
        div(
          class = "text-center w-100",
          div(city_name),
          div(
            class = "mt-4 d-flex justify-content-evenly",
            !!!purrr::pmap(
              forecast(),
              function(day, description, image, temp_low, temp_high, ...) {
                wday <- strftime(day, "%A")

                img(
                  src = image,
                  alt = glue("{wday}: {description}"),
                  style = css(
                    width = "max(7vw, 80px)",
                    height = "max(7vw, 80px)",
                    background_color = glue(
                      "rgba(var(--bs-{answer_color}-rgb), 0.25)"
                    ),
                    border_radius = "50%"
                  )
                ) |>
                  bslib::tooltip(
                    tags$strong(wday),
                    br(),
                    description,
                    br(),
                    temp_low, " \u2013 ", temp_high, "°F",
                    placement = "bottom"
                  )
              }
            )
          )
        )
      }
    )
  })
}

shinyApp(ui, server)
