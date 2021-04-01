
install.packages("pak", repos = "https://r-lib.github.io/p/pak/dev/")
install.packages("xaringan")
install.packages("sass")
pak::pkg_install("xaringanthemer", dependencies = TRUE)
pak::pkg_install(c(
  "here",
  "metathis",
  "gadenbuie/xaringanExtra",
  "gadenbuie/rsthemes",
  "gadenbuie/ermoji",
  "gadenbuie/cleanrmd",
  "gadenbuie/js4shiny",
  "gadenbuie/lorem"
))

if (interactive()) {
  fs::dir_create(fs::path_home(".config", "rstudio", "keybindings"))
  fs::file_copy(".addins.json", fs::path_home(".config", "rstudio", "keybindings", "addins.json"))
  rsthemes::install_rsthemes()
}
