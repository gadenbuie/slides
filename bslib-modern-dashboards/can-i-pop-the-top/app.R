library(shiny)
library(brochure)
conflicted::conflict_prefer("page", "brochure")
conflicted::conflict_prefer("box", "shinydashboard")

shinydashboard <- new.env()
bslib <- new.env()
quick <- new.env()

source("app-shinydashboard.R", local = shinydashboard)
source("app-bslib.R", local = bslib)
source("app-quick.R", local = quick)

cities <- readRDS("data/cities.rds")

INIT_LOCATION <- "Atlanta, Georgia"
INIT_CITY <- find_location(INIT_LOCATION, cities)[1, ]
INIT_LOCATION <- INIT_CITY$full_name
INIT_WEATHER <- get_city_weather(INIT_CITY)

icon_link_card <- function(href, title, icon) {
  card(
    card_body(
      a(
        href = paste0(
          if (identical(Sys.getenv("R_CONFIG_ACTIVE", ""), "shinyapps")) {
            "/jeep-weather"
          },
          href
        ),
        as_fill_carrier(),
        div(
          class = "fs-1 d-flex h-100 justify-content-center align-items-center flex-column",
          div(bsicons::bs_icon(icon, size = "10rem")),
          div(title)
        )
      )
    )
  )
}

brochureApp(
  page(
    href = "/",
    ui = page_fillable(
      title = "Is this a dashboard?",
      class = "bslib-page-dashboard",
      h1("Is this a dashboard?"),
      input_dark_mode(style = "display: none;"),
      layout_columns(
        icon_link_card("/shinydashboard", "shinydashboard", "speedometer"),
        icon_link_card("/bslib", "bslib", "balloon-fill"),
        icon_link_card("/quick", "something else", "chat-square-heart-fill")
      )
    )
  ),
  page(
    href = "/shinydashboard",
    ui = shinydashboard$ui,
    server = shinydashboard$server
  ),
  page(
    href = "/bslib",
    ui = bslib$ui,
    server = bslib$server
  ),
  page(
    href = "/quick",
    ui = quick$ui,
    server = quick$server
  )
)
