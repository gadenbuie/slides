#! /usr/bin/env Rscript

sd <- callr::r_bg(function() {
  shiny::devmode(FALSE)
  shiny::runApp("app-shinydashboard.R", port = 4240)
})

bs <- callr::r_bg(function() {
  shiny::devmode(FALSE)
  shiny::runApp("app-bslib.R", port = 4241)
})

qs <- callr::r_bg(function() {
  shiny::devmode(FALSE)
  shiny::runApp("app-quick.R", port = 4242)
})

tryCatch(
  while (TRUE) { 
    lines <- c(sd$read_error_lines(), bs$read_error_lines(), qs$read_error_lines())
    if (length(lines)) {
      message(paste(lines, collapse = "\n"), "\n")
    }
  },
  interrupt = function(e) {
    message("\nShutting down apps...")
    sd$kill()
    bs$kill()
    qs$kill()
  }
)
