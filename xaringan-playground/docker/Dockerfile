FROM rocker/rstudio:4.0.3-daily

RUN apt-get update && apt-get install -y xorg
RUN R -e 'install.packages("xaringan", dependencies = TRUE)'
RUN R -e 'install.packages("miniUI", dependencies = TRUE)'

COPY playground.Rmd /home/rstudio/playground.Rmd
COPY rstudio-prefs.json /home/rstudio/.config/rstudio/rstudio-prefs.json
RUN chown rstudio:rstudio /home/rstudio/playground.Rmd && \
  chown rstudio:rstudio /home/rstudio/.config/rstudio/rstudio-prefs.json

RUN echo "www-frame-origin=any" >> /etc/rstudio/disable_auth_rserver.conf
