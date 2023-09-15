fake_indent <- function(x) {
  x <- gsub("^[ ]{8}", strrep("&nbsp;", 8), x)
  x <- gsub("^[ ]{6}", strrep("&nbsp;", 6), x)
  x <- gsub("^[ ]{4}", strrep("&nbsp;", 4), x)
  gsub("^[ ]{2}", strrep("&nbsp;", 2), x)
}

fake_chunk <- function(code, ..., engine = "r", opts_head = "", n_ticks = 3) {
  if (nzchar(opts_head)) opts_head <- paste0(" ", opts_head)
  ticks <- strrep("&#x60;", n_ticks)

  header <- sprintf("%s{%s%s}", ticks, engine, opts_head)
  footer <- sprintf("%s", ticks)

  code <- strsplit(code, "\n")[[1]]
  code <- paste(c(header, code, footer), collapse = "<br>")
  code <- fake_indent(code)

  htmltools::div(
    class = "code-chunk",
    ...,
    htmltools::HTML(code)
  )
}

show_from <- function(idx, x) {
  sprintf('<span data-show-from="%s">%s</span>', idx, x)
}

show_on <- function(idx, x) {
  sprintf('<span data-show-on="%s">%s</span>', idx, x)
}
