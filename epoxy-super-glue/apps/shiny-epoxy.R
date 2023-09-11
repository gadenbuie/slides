library(shiny)
library(bslib)
library(epoxy)

ui <- page_fixed(
  theme = bs_theme(version = 5, preset = "shiny"),
  textInput("greetings", "Greeting", "Hello"),
  textInput("company", "Company", "posit"),
  textInput("year", "Year", "2023"),
  ui_epoxy_html(
    .id = "output",
    tags$p("{{greetings}}, {{company}}::conf({{year}})!")
  ),
  includeScript(here::here("epoxy-super-glue", "apps", "shiny-text-output.js"))
)

ui
