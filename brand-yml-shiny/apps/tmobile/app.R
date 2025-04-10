library(shiny)
library(bslib)
library(ggplot2)
library(dplyr)
library(thematic)

if (FALSE) {
  library(showtext)
  library(sysfonts)
  library(systemfonts)
  library(ragg)
  library(curl)
}

# Patch sass::font_google() to avoid downloading if needed
original_font_google <- sass::font_google
font_google <- function(..., local = TRUE) {
  original_font_google(..., local = FALSE)
}
utils::assignInNamespace("font_google", font_google, ns = "sass")


theme <- bs_theme(brand = "brand-tmobile.yml")
brand <- attr(theme, "brand")

theme_set(theme_minimal(base_size = 20))
update_geom_defaults("bar", list(fill = brand$color$primary))

thematic_shiny(
  font = font_spec(brand$typography$base$family),
  accent = brand$color$primary,
)

addResourcePath("brand", dirname(brand$path))

ui <- page_sidebar(
  title = h1(
    img(
      src = file.path("brand", brand$logo$images[["icon-pink"]]),
      height = 30
    ),
    "Intent Model Demo",
    class = "bslib-page-title navbar-brand"
  ),
  theme = theme,

  sidebar = sidebar(
    width = "25%",
    bg = brand$color$primary,

    textAreaInput(
      "message",
      "message",
      "I want to unlock my phone",
      rows = 3
    ),

    selectInput(
      "sms",
      "example sms",
      choices = c(
        "[No SMS]",
        "Can I unlock my phone?",
        "How do I check my balance?",
        "I need help with my bill"
      ),
      selected = "[No SMS]"
    ),

    selectInput(
      "aal",
      "example aal",
      choices = c(
        "[no aal]",
        "unlock phone",
        "check balance",
        "billing help"
      ),
      selected = "[no aal]"
    )
  ),

  plotOutput("intentPlot")
)

# Define server logic
server <- function(input, output, session) {
  # Function to generate random probabilities based on input text
  generate_probabilities <- function(message) {
    # Define intent categories
    intents <- c(
      "pin",
      "traveling",
      "locked",
      "app",
      "purchase",
      "sim",
      "requirements",
      "email",
      "device",
      "unlock"
    )

    # Generate base probabilities
    set.seed(sum(utf8ToInt(message)))
    probs <- runif(length(intents), min = 5, max = 40)

    # If message contains specific keywords, boost relevant intents
    if (grepl("unlock", tolower(message))) {
      probs[which(intents == "unlock")] <- 100
      probs[which(intents == "device")] <- 42
    } else if (grepl("pin", tolower(message))) {
      probs[which(intents == "pin")] <- 85
    } else if (grepl("travel", tolower(message))) {
      probs[which(intents == "traveling")] <- 90
    } else if (grepl("app", tolower(message))) {
      probs[which(intents == "app")] <- 75
    }

    # Normalize to ensure they're somewhat realistic
    probs <- pmin(probs, 100)

    # Create data frame
    data.frame(
      intent = factor(intents, levels = intents),
      probability = probs
    )
  }

  # Reactive expression for the plot data
  plot_data <- reactive({
    # Combine message with SMS and AAL if they're not the default values
    full_message <- input$message

    if (identical(input$sms, "[No SMS]")) {
      full_message <- c(full_message, input$sms)
    }
    if (identical(input$aal, "[no aal]")) {
      full_message <- c(full_message, input$aal)
    }

    generate_probabilities(paste(full_message, collapse = " "))
  })

  # Render the plot
  output$intentPlot <- renderPlot({
    data <- plot_data()

    ggplot(data, aes(x = intent, y = probability)) +
      geom_bar(stat = "identity") +
      geom_text(
        aes(label = paste0(round(probability, 1), "%")),
        vjust = -0.5,
      ) +
      scale_y_continuous(
        limits = c(0, 110),
        labels = function(x) paste0(x, "%"),
        breaks = seq(0, 100, 20)
      ) +
      labs(y = "Probability", x = "") +
      theme(
        axis.text.x = element_text(angle = 45, hjust = 1),
        panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank(),
        panel.grid.minor.y = element_blank(),
        axis.title.y = element_text(face = "bold"),
        plot.margin = margin(t = 20, r = 20, b = 20, l = 20)
      )
  })
}

shinyApp(ui = ui, server = server)
