library(shiny)
library(shinyComponents)

inc <- ShinyComponent$new("increment.Rmd")

ui <- fluidPage(
  h2("Shiny Components in Action"),
  p(
    "I loaded the Shiny Component with:",
    HTML('<pre><code>inc <- ShinyComponent$new("increment.Rmd")</code></pre>')
  ),
  h3(code("inc$ui$button()")),
  p(
    "I have here two buttons:",
    inc$ui$button("Button One", "user", id = "one", class = "btn-primary"),
    " and ",
    inc$ui$button("Button Two", "user-friends", id = "two", class = "btn-danger")
  ),
  h3(code("inc$ui$number()")),
  p(
    "The value of button two is ",
    inc$ui$number(id = "two"),
    " and the value of button one is ",
    inc$ui$number(id = "one"),
    "."
  ),
  verbatimTextOutput("debug")
)

server <- function(input, output, session) {
  one <- inc$server(id = "one", initial_value = 10, class = "text-primary")
  two <- inc$server(id = "two", initial_value = 50, class = "text-danger")

  output$debug <- renderPrint({
    list(
      one = one(),
      two = two()
    )
  })
}

shinyApp(ui, server)
