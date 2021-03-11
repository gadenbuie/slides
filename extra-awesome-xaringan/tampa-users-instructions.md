# Starter Kit for Tampa R Users Group Speakers

<a href="https://tampausers.github.io"><img align="right" src="https://raw.githubusercontent.com/TampaUseRs/TampaUseRs/master/assets/hex-logo/trug-hex-800.png" width="250px"></a>

## How to Use This Kit

This kit provides starter files for preparing for your [Tampa R Users Group][trug-website] talk that will make it easier for you to prepare, for the attendees to follow along, and for the organizers to stay organized.

If you're comfortable with git and GitHub, you can fork this kit and use it as a starting place for you talk development.
You could also just clone this repo locally and start there.

If you'd rather not deal with git or GitHub, you can [download this repo as a zip file](https://github.com/TampaUseRs/speaker-starter-kit/archive/master.zip) and start there.

This document contains some instructions and guidelines for speakers based on best practices learned from previous presentations.

Aim to provide three files with your presentation:

1. Your slides
2. A companion R script
3. A short README with
    - a summary of your talk,
    - links to data files (if needed), and
    - a list of required packages to run the script.

More details and tips for each of these files are included below.
Also included are templates for your talk description that will be published on [Meetup][trug-meetup] and sent out to the [Tampa R Users Group][trug-website].

## Talk Prep Checklist

#### Three weeks before your talk

- [ ] Confirm your presentation date with the TampaUsers organizers at <UseRTampa@gmail.com> or via our [Meetup page][trug-meetup]

#### Two weeks before your talk

- [ ] Choose a [presentation topic](#planning-your-talk-topic)
- [ ] Send your [talk description](#talk-description) to TampaUsers organizers at <UseRTampa@gmail.com> or via [Meetup][trug-meetup]

#### Prepare your talk

- [ ] [Prepare your slides](#slides-and-presentation-tips)
- [ ] Write a [companion R script](#companion-script)
- [ ] If using this speaker kit, rename or remove the speaker kit's `README.md`
- [ ] Create a [README for your talk](#talk-readme)

#### 1-3 days before your talk

- [ ] [Submit your talk materials](#submit-your-talk-materials)

## Planning Your Talk Topic

Plan for a 20-30 minute talk.
This will give plenty of time for you to present on your topic, field questions, and digress into the details.

To keep your talk focused, start by focusing on a single take-away for the audience:

> After my talk, participants **will be able to...**

You don't need to cover every corner or possible use case of your chosen methodology or package.
If you are presenting about a package, stick to the most important functions or features.
If you'll be discussing a technique or methodology, focus on the most tricky aspects that are hard to understand and can benefit from your expertise.

Working through an example is an excellent way to demonstrate a package or technique.
If using an external dataset or data source in your examples, try to use only one dataset.
That way, you'll only have to explain your data structure one time in your talk.
Remember: you'll be presenting to data enthusiasts who love to poke around a good dataset and will certainly want to ask questions about the dataset you choose.

## Talk Description

You can use this template as a starting point for your talk description.
This will be published on [Meetup][trug-meetup] and [our website][trug-website] and may be included in announcement emails sent by Meetup.
You only need to replace the parts in `{}`, or feel free to use the template as a starting point.

```plain
Learn {how to|about} {package|method|skill|approach|etc.}!
{Package|Method|Skill} {provides functions|can be used} to {complete exciting task}.
{Your Name} will walk us through an example demonstrating {key task}.

{Your Name} is an {occupation} at {company}, and uses R to {do fun things}.
{More interesting things about yourself}.
{He|She|They} can be found online at {Twitter}, {Linkedin}, or {personal website}.
```

When you've settled on your talk topic, send your description to the meetup organizers via our [Meetup page][trug-meetup] or [&commat;UseRsTampa][trug-twitter] so that we can announce your talk.
If you include your Twitter handle, we'll be sure to include you in any posts.

## Slides and Presentation Tips

### Presentation Tips

In our current environment, we use flat screen televisions in a medium-sized room.

- Use a wide-screen 16:9 format.

- Use large fonts that are easily readable at a distance. (As a starting point, try increasing the default size of your presentation software/package by 130%.)

- Format your R code for easy readability and understandability, using descriptive variable names, extra lines, whitespace, etc.

- Favor easy to understand code structures over esoteric one-liners.

- Clearly indicate the packages required for the demo code. If you can get away with a single `library(tidyverse)`, it's a great place to start.

If you're brave, live coding is encouraged.

- Practice your examples before your talk.

- Type out your example code when possible. Live coding doesn't work as well if you simply run lines of code from a document because it's too easy to go too fast. In this case, it may be better to move your code to a slide where it's easier to read.

- Increase the viewing size of your RStudio or terminal window using <kbd>Ctrl</kbd>/<kdb>&#8984;</kbd> + <kbd>+</kdb>.

- Review tips in the Software Carpentry Foundation's [Live Coding Instructor Training](https://carpentries.github.io/instructor-training/15-live/).

There are some really great presentation (and self-marketing) tips in Jenny Bryan's [Carpe Talk](https://www.tidyverse.org/articles/2018/07/carpe-talk/) tidyverse blog post.
Here are three resources that can dramatically increase the effectiveness of your presentation:

1. [7 Tips for Presenting Bulleted Lists in Digital Content](https://www.nngroup.com/articles/presenting-bulleted-lists/) by David L. Stern

2. [The Art of Slide Design](https://speakerdeck.com/mseckington/the-art-of-slide-design) by Melinda Seckington

3. [Presenting Effectively](https://kieranhealy.org/blog/archives/2018/03/24/making-slides/) by Kieran Healy

### Things to Know About the Presentation Space

Currently, the Tampa R UseRs Group is hosted at [Southern Brewing and Wine Making](https://www.southernbrewingwinemaking.com/) at [4500 N Nebraska Ave, Tampa, FL](https://goo.gl/maps/33VS8NAP3N52).

Here are a few tips to keep in mind:

- The presentation is projected on a flat screen television either in an area adjacent to the bar or outside.

- If we're hosting inside, the room may be loud and we'll use a microphone and loudspeaker to help everyone hear. We'll try to have a mic stand available for the live coding portion, but please let the organizers know if live coding is a major component of your presentation.

- There is free Wi-Fi access available at the venue, but it will be considerably slower and more flaky than your internet at home. It's a good idea to be able to present without internet access, or to limit examples that require the internet to utilize minimal bandwidth.

    If you do use the internet in your presentation, make sure you have a backup plan in case the internet decides not to work.

### Using R Markdown to Prepare Your Slides

You're welcome to make your slides in the presentation software of your choice.
(You don't even have to make slides if you'd rather [live code](https://carpentries.github.io/instructor-training/15-live/).)
It's a good idea to export your slides as PDF for sharing.

If you're not afraid of getting meta and using R to make your slides about R, you can use one of the available literate programming frameworks based on [R Markdown][rmarkdown].

R Markdown is a plain-text markup language that lets you style regular text (like making a word **bold** with `**asterisks**`).
More importantly, it also allows you to blend R code into your documents and slides, showcasing both the code and its results.
RStudio's [Introduction to R Markdown](https://rmarkdown.rstudio.com/lesson-1.html) is an excellent place to get started.

RStudio's markdown guide also includes a section on [Slide Presentations](https://rmarkdown.rstudio.com/lesson-11.html), where they demonstrate using R Markdown to render:

- [PDF presentations with beamer](http://rmarkdown.rstudio.com/beamer_presentation_format.html)
- [HTML presentations with ioslides](http://rmarkdown.rstudio.com/ioslides_presentation_format.html)
- [HTML presentations with slidy](http://rmarkdown.rstudio.com/slidy_presentation_format.html)
- [HTML presentations with reveal.js](http://rmarkdown.rstudio.com/revealjs_presentation_format.html)
- [PowerPoint presentations](https://bookdown.org/yihui/rmarkdown/powerpoint-presentation.html)

We also recommend the [xaringan] package for creating HTML and CSS-based presentations -- and you can customize your slide styles using the [xaringanthemer] package from a Tampa UseR.

## Companion Script

Including a companion script with your talk will help participants follow along both during your talk and afterwards at home.

If you've used an [R Markdown based framework](#using-r-markdown-to-prepare-your-slides) to build your slides, you can create a companion script from the code included in your slides by using the [knitr] function `purl()` to extract the R code chunks in your slide into a single script.

```r
knitr::purl("slides.Rmd")
# Writes out: slides.R
```

Otherwise, keep track of the code you demonstrate in a single script.

It's important to also keep track of the packages that you use.
Try to use packages that are popular and that are hosted on CRAN or BioConductor.
Think carefully about including packages that are custom, difficult to setup, or not common for standard R installations, unless they are necessary or central to the topic of your talk.

At the top of your companion slide, include the `install.packages()` or `devtools::install_github()` code that installs the packages required to run your scripts, but comment them out.
This information will be duplicated in your talk README.

## Talk README

The speaker starter kit includes an example README file called [`README_example.md`](README_example.md) that you can use as a starting point.
Remove or rename these speaker instructions and rename `README_example.md` to `README.md`.

GitHub automatically renders README files at a folder root, so meetup participants who view your slides folder in [TampaUseRs/TampaUseRs/meetups](https://github.com/TampaUseRs/TampaUseRs/tree/master/meetups) will get an overview of your talk, the files they need to download, and packages they need to install before your presentation.
For an example of how this looks, see the meetup from [2018-06-19](https://github.com/TampaUseRs/TampaUseRs/tree/master/meetups/20180619-machine-learning).

In essence, this README should contain

- The title of your talk
- Description of your topic
- Links to data files required
- List of packages required
- Your contact information (optional)

## Submit Your Talk Materials

The Tampa R Users Group hosts copies of slides and accompanying materials online at <https://github.com/TampaUseRs/TampaUseRs>.

There are three ways to have your slides included in this repository:

1. Submit a [Pull Request](https://help.github.com/articles/creating-a-pull-request/) to the [TampaUseRs/TampaUseRs](https://github.com/TampaUseRs/TampaUseRs) repo. To do this:

    1. Fork the [TampaUseRs/TampaUseRs](https://github.com/TampaUseRs/TampaUseRs) repo into your GitHub account.
    2. Clone the repo to your local computer.
    3. Create a new branch for your slides. Inside the repo folder, run

        ```bash
        git checkout -b my-presentation
        ```

    4. Create a folder in `meetups` with the date and short description of your talk:

        ```bash
        meetups/YYYYMMDD-talk-topic
        ```

    5. Add your slides, code and additional files.

    6. Commit these files to your local repo and push to your fork on GitHub

        ```bash
        git add -u
        git commit -m "Add slides for my talk topic"
        git push -u origin my-presentation
        ```

    7. Navigate to your fork on GitHub, choose your new branch from the "Branch" drop-down menu near the top of the page, and then select "New Pull Request". By default, GitHub will choose the master branch of the TampaUseRs repo, but check that this is the "base" branch. Enter a short description and click "Create Pull Request".

2. Send your materials to Tampa R Users Group meetup organizers at <UseRTampa@gmail.com>.

3. Host your slide materials online (GitHub, personal website, etc.) and send the link to us via [Twitter][trug-twitter] or [Meetup][trug-meetup].

[knitr]: https://yihui.name/knitr
[xaringan]: https://github.com/yihui/xaringan
[xaringanthemer]: https://pkg.garrickadenbuie.com/xaringanthemer
[rmarkdown]: https://rmarkdown.rstudio.com/
[trug-meetup]: https://www.meetup.com/Tampa-R-Users-Group/
[trug-website]: https://tampausers.github.io
[trug-twitter]: https://www.twitter.com/UseRTampa/