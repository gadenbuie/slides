theme_css_path <- here::here("assets", "css", "xaringan-rstudio.css")

xaringanthemer::style_duo_accent(
  primary_color = "#4D8DC9",
  secondary_color = "#A4C689",
  header_font_google = xaringanthemer::google_font("Zilla Slab"),
  base_font_size = "24px",
  padding = "1rem 3rem 2rem 3rem",
  text_color = "#404040",
  link_color = "#447099",
  text_bold_color = "#E7553C",
  blockquote_left_border_color = "var(--secondary)",
  table_row_even_background_color = "var(--gray-light)",
  # code_highlight_color = "#FFFBB1",
  code_highlight_color = NULL,
  inverse_background_color = "var(--gray)",
  inverse_text_color = "var(--gray-light)",
  inverse_header_color = "var(--white)",
  colors = c(
    blue = "#4D8DC9",
    gray = "#404040",
    "gray-light" = "#F8F8F8",
    white = "#FFFFFF",
    orange = "#E7553C",
    "gray-logo" = "#4D4D4D",
    "blue-dark" = "#447099",
    "blue-light" = "#75AADB",
    green = "#A4C689",
    "green-dark" = "#69995D",
    yellow = "#FDBE4B",
    pink = "#D260A4",
    "blue-washed" = "#F0F5FA",
    "green-washed" = "#F4F8F1",
    "yellow-washed" = "#FFF1D6",
    "orange-washed" = "#FDEFED",
    "pink-washed" = "#FBEFF6"
  ),
  extra_fonts = list(
    xaringanthemer::google_font("Nanum Pen Script"),
    xaringanthemer::google_font("Special Elite"),
    xaringanthemer::google_font("Pompiere")
  ),
  extra_css = list(
    ".f-pen" = list("font-family" = "'Nanum Pen Script', var(--text-font-family), var(--text-font-family-fallback)"),
    ".f-typewriter" = list("font-family" = "'Special Elite', var(--code-font-family), monospace"),
    ".f-zilla" = list("font-family" = "Zilla Slab"),
    ".f-pompiere" = list("font-family" = "Pompiere"),
    ".remark-slide h1, .remark-slide h2, .remark-slide h3, .remark-slide h4" = list(
      "margin-top" = 0,
      "margin-bottom" = "0.5em"
    ),
    "blockquote" = list("margin-left" = 0),
    "::selection" = list("background-color" = "rgba(85, 235, 188, 0.6)"),
    ".fullscreen" = list(
      padding = 0,
      height = "100%",
      width = "100%"
    ),
    ".hide-count .remark-slide-number" = list(display = "none"),
    ".mh-auto" = list("margin-left" = "auto", "margin-right" = "auto"),
    ".remark-slide-content a" = list("border-bottom" = "2px dashed var(--blue-light)"),
    ".remark-slide-content a:hover" = list("border-bottom" = "2px solid var(--blue-light)")
  ),
  outfile = theme_css_path
)

# Additional styles...
cat("
.talk-logo {
  width: 200px;
  height: 750px;
  position: absolute;
  top: 6%;
  right: 4%;
  background-image: url('https://rstudio.com/wp-content/uploads/2018/10/RStudio-Logo-Gray.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: contain;
}
.talk-institute {
  margin-top: 0.5em;
}
.talk-date {
  margin-top: 1em;
}
kbd, .kbd {
  padding: 0.1em 0.6em;
  border: 1px solid var(--text-lighter);
  font-family: var(--font-monospace);
  background-color: var(--text-lighter);
  color: var(--text);
  -webkit-box-shadow: 0 1px 0px rgba(0, 0, 0, 0.2), 0 0 0 1px #fff inset;
  box-shadow: 0 1px 0px 2px rgba(0, 0, 0, 0.2), 0 0 0 1px #fff inset;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  display: inline-block;
  margin: 0 0.1em;
  line-height: 1.4;
  white-space: nowrap;
  font-size: 1em !important;
}
",
  file = theme_css_path,
  append = TRUE
)
