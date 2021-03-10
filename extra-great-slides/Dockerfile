FROM rocker/verse:4.0.4-daily

RUN apt-get update && apt-get install -y libavfilter-dev
COPY deps.R /tmp/deps.R
RUN Rscript /tmp/deps.R && rm /tmp/deps.R
COPY . /home/rstudio/extra-great-slides

