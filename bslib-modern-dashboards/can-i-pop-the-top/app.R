library(shiny)
library(brochure)
conflicted::conflict_prefer("page", "brochure")

bslib <- new.env()
quick <- new.env()

source("app-bslib.R", local = bslib)
source("app-quick.R", local = quick)

brochureApp(
  page(
    href = "/",
    ui = page_fillable(
      title = "Is this a dashboard?",
      class = "bslib-page-dashboard",
      h1("Is this a dashboard?"),
      input_dark_mode(style = "display: none;"),
      layout_columns(
        card(
          card_body(
            a(
              href = "/bslib",
              as_fill_carrier(),
              div(
                class = "fs-1 d-flex h-100 justify-content-center align-items-center flex-column",
                div(
                  bsicons::bs_icon("balloon-fill", size = "10rem")
                ),
                div("bslib")
              )
            )
          )
        ),
        card(
          card_body(
            a(
              href = "/quick",
              as_fill_carrier(),
              div(
                class = "fs-1 d-flex flex-column h-100 justify-content-center align-items-center",
                div(
                  bsicons::bs_icon("chat-square-heart-fill", size = "10rem")
                ),
                div("quick")
              )
            )
          )
        )
      )
    )
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
