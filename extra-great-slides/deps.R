
install.packages("pak", repos = "https://r-lib.github.io/p/pak/dev/")
install.packages("xaringan")
install.packages("sass")
pak::pkg_install(c(
  "here",
  "xaringanthemer",
  "metathis",
  "showtext",
  "sysfonts",
  "gadenbuie/xaringanExtra",
  "gadenbuie/rsthemes",
  # "jhelvy/xaringanBuilder",
  "gadenbuie/countdown",
  "gadenbuie/ermoji",
  "gadenbuie/cleanrmd",
  "gadenbuie/js4shiny"
))

if (interactive()) {
  fs::dir_create(fs::path_home(".config", "rstudio", "keybindings"))
  fs::file_copy(".addins.json", fs::path_home(".config", "rstudio", "keybindings", "addins.json"))
  rsthemes::install_rsthemes()
}