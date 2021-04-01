---
title: Sliding in Style
date: 2021-04-01
where: South Coast MA UseR Group
twitter: "@grrrck"
web: https://www.garrickadenbuie.com
---

[xaringan]: https://slides.yihui.org/xaringan/
[xaringanthemer]: https://pkg.garrickadenbuie.com/xaringanthemer
[xaringanExtra]: https://pkg.garrickadenbuie.com/xaringanExtra
[grrrck]: https://twitter.com/grrrck
[gab]: https://www.garrickadenbuie.com
[docker]: https://www.docker.com/
[docker-image]: https://hub.docker.com/u/grrrck

# Sliding in Style

## Description

The [xaringan] package by YiHui Xie lets R users and R Markdown authors easily blend data, text, plots and [htmlwidgets] into beautiful HTML presentations that look great on the web, in print, and on screens.

Together we’ll create a completely customized xaringan slide style with [xaringanthemer], a package that lets you quickly create a complete slide theme from only a few color choices. Then we’ll talk about how you can take your slide design one step further with just a little bit of CSS.

- [xaringanthemer]
- [xaringanExtra]
- [lorem]

## Packages

[xaringan]: https://slides.yihui.org/xaringan/
[xaringanthemer]: https://pkg.garrickadenbuie.com/xaringanthemer
[grrrck]: https://twitter.com/grrrck
[gab]: https://www.garrickadenbuie.com
[htmlwidgets]: http://www.htmlwidgets.org/
[lorem]: https://github.com/gadenbuie/lorem

- [xaringan]
- [xaringanthemer]
- [xaringanExtra]

```r
# On CRAN
install.packages("xaringan")
install.packages("xaringanthemer", dependencies = TRUE)

# From GitHub
# install.packages("remotes")
remotes::install_github("gadenbuie/xaringanExtra")
remotes::install_github("gadenbuie/lorem")
```

If you use [docker], you can get set up with an [environment for this presentation][docker-image] with:

```bash
docker run -d --rm -p 8787:8787 -e DISABLE_AUTH=true grrrck/sliding-in-style
```