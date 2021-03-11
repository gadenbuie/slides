# "Extra Awesome xaringan Presentations" Companion R Script ---------------

# title: Extra Awesome xaringan Presentations
# presenter: Garrick Aden-Buie
# date: 2020-02-25
# email: garrick@adenbuie.com
# twitter: "@grrrck"
# web: https://www.garrickadenbuie.com

# Install required packages -----------------------------------------------

install.packages("xaringan")
install.packages("babynames")

if (!requireNamespace("devtools", quietly = TRUE)) {
  stop("Please install the devtools package: install.packages('devtools')")
}

devtools::install_github("gadenbuie/xaringanthemer@dev", dependencies = TRUE)
devtools::install_github("gadenbuie/xaringanExtra", dependencies = TRUE)
devtools::install_github("gadenbuie/metathis", dependencies = TRUE)
