options(htmltools.dir.version = FALSE)
knitr::opts_chunk$set(
  fig.width= 9, 
  fig.height= 3.5, 
  fig.retina= 3,
  out.width = "100%",
  cache = FALSE,
  echo = TRUE,
  message = FALSE, 
  warning = FALSE
)

library(metathis)

htmltools::tagList(
  moffittdocs::use_moffitt_tachyons(),
  xaringanExtra::use_animate_css(TRUE, xaringan = FALSE),
  xaringanExtra::use_tile_view(),
  xaringanExtra::use_extra_styles(hover_code_line = TRUE, mute_unhighlighted_code = TRUE),
  xaringanExtra::use_share_again(),
  meta() %>%
    meta_general(
      description = "Build your own universe: Scale high-quality research data provisioning with R packages",
      generator = "xaringan and remark.js"
    ) %>% 
    meta_name("github-repo" = "tgerke/build-your-own-universe") %>% 
    meta_social(
      title = "Build your own universe: Scale high-quality research data provisioning with R packages",
      url = "https://build-your-own-universe.netlify.app",
      image = "https://build-your-own-universe.netlify.app/social-card.png",
      image_alt = "Title slide of Build your own universe: Scale high-quality research data provisioning with R packages, presented at R/Medicine 2020 by Travis Gerke and Garrick Aden-Buie",
      og_type = "website",
      og_author = "Travis Gerke",
      twitter_card_type = "summary_large_image",
      twitter_creator = "@grrrck",
      twitter_site = "@travisgerke"
    ) %>% 
    include_meta()
)
