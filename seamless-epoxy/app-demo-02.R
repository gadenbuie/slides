library(shiny)
library(bslib)
library(epoxy)
library(dplyr)
library(forcats)

cc <- readRDS("data-raw/childcare_summary.rds")
cc$age <- fct_recode(cc$age, "school-age child" = "school-age")

ui <- page_fluid(
  titlePanel("Childcare Costs"),
  class = "p-3",
  layout_columns(
    radioButtons("county_size", "County Size", levels(cc$county_size), width = "100%"),
    radioButtons("type", "Childcare Type", unique(cc$type), width = "100%"),
    radioButtons("age", "Age Group", levels(cc$age), width = "100%")
  ),
  ui_epoxy_html(
    .id = "summary",
    p(
      class = "fs-3 mt-3",
      "The median childcare cost for a single ",
      "{{ age }} in {{ type }}-based care",
      "is {{ cost }} in {{ county_size}} counties."
    )
  )
)

server <- function(input, output, session) {
  cost <- reactive({
    cc |>
      filter(
        age == input$age,
        type == input$type,
        county_size == input$county_size
      ) |>
      mutate(cost = scales::dollar(cost, accuracy = 1))
  })

  output$summary <- render_epoxy(.list = cost())
}

shinyApp(ui, server)
