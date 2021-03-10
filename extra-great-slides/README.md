---
title: Making Extra Great Slides
subtitle: With xaringan, xaringanthemer, and xaringanExtra
date: 2021-03-10
where: New York Open Statistical Programming Meetup
twitter: "@grrrck"
web: https://www.garrickadenbuie.com
---

[xaringan]: https://slides.yihui.org/xaringan/
[xaringanthemer]: https://pkg.garrickadenbuie.com/xaringanthemer
[xaringanExtra]: https://pkg.garrickadenbuie.com/xaringanExtra
[xaringanBuilder]: https://github.com/jhelvy/xaringanBuilder
[metathis]: https://pkg.garrickadenbuie.com/metathis
[grrrck]: https://twitter.com/grrrck
[gab]: https://www.garrickadenbuie.com
[docker]: https://www.docker.com/
[docker-image]: https://hub.docker.com/u/grrrck

# Making Extra Great Slides

## Description

Learn how to make extra great [xaringan] slides with a few packages

- [xaringanthemer]
- [xaringanExtra]
- [xaringanBuilder]
- [metathis]

that add the extra touches needed to personalize your slides and make them stand out from the crowd.

## Setup

Included files:

- [deps.R](deps.R)
- slides in [docs folder](docs)

## Packages Used

```r
# On CRAN
install.packages("xaringan")
install.packages("xaringanthemer")
install.packages("metathis")
install.packages(c("showtext", "sysfonts"))

# From GitHub
# install.packages("remotes")
remotes::install_github("gadenbuie/xaringanExtra")
remotes::install_github("jhelvy/xaringanBuilder")
remotes::install_github("gadenbuie/countdown")
```

If you use [docker], you can get set up with an [environment for this presentation][docker-image] with:

```bash
docker run -d --rm -p 8787:8787 -e DISABLE_AUTH=true grrrck/extra-great-slides
```