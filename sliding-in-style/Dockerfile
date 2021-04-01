FROM rocker/verse:4.0.4-daily

COPY deps.R /tmp/deps.R
RUN Rscript /tmp/deps.R && rm /tmp/deps.R
COPY . /home/rstudio/sliding-in-style
RUN chown rstudio:rstudio -R /home/rstudio
