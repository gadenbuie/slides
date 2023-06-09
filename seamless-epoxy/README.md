# Seamless data-driven reporting with {epoxy}
Garrick Aden-Buie
2023-06-08

## Abstract

> {epoxy} is a new R package that allows report authors to seamless
> blend prose and data in markdown, HTML, and LaTeX reports. {epoxy}
> builds on the excellent tools for data-driven reporting provided by R
> Markdown, Quarto and Shiny, while saving report authors from tedious
> and repetitive data formatting tasks. This talk will highlight the
> many ways that {epoxy} can help data scientists in medicine to
> streamline reports, articles, and Shiny apps.

## Links

-   [Talk on
    Sched](https://rmed2023a.sched.com/event/1MwTk/seamless-data-driven-reporting-with-epoxy-garrick-aden-buie-posit-software-pbc)

-   [R/Medicine 2023](https://events.linuxfoundation.org/r-medicine/)

-   [Full
    Schedule](https://events.linuxfoundation.org/r-medicine/program/schedule/)

## Outline

### Data-driven reporting (epoxy in reports)

Connecting prose with data. One sentence with a whole lot of context.

Starting with an example from the [Childcare Costs
dataset](https://github.com/rfordatascience/tidytuesday/blob/master/data/2023/2023-05-09/readme.md)
from TidyTuesday but provided by the [National Database of Childcare
Prices](https://www.dol.gov/agencies/wb/topics/featured-childcare).

Acknowledge that there are often many many decisions packed into very
tight spaces in our reports. Beyond the obvious issues of putting
together the data in the first place, even once you have the data in
your hands (or your console), you still face a journey from table to
narrative.

Here, let’s see what I mean:

1.  This data comes to us “pre-tidied” by our good friends at
    TidyTuesday
2.  So I can download it and get started quickly
3.  They make it easy to figure out what you have with data dictionaries
    and things
4.  (I’m already getting impatient… just which variables do I use?)
5.  Once you pick your variables you write some code
6.  okay lots of code
7.  okay so much code that you don’t even use it all
8.  finally you have some numbers in a table

We started with piles of coal, now we have a diamond. Kind of. We still
need to set and place the diamond — i.e. put it in plots and describe it
in prose. (Don’t worry, I’m not going to keep up this analogy any more.)

-   Throw data in a plot or two

-   Notice that we mostly take this table and send it off to ggplot2

#### The R Markdown path

Now let’s write the text. Take the data and plug it into prose using
regular knitr inline R syntax.

It’s fine. I mean it’s amazing. But it’s just okay. Being the
professional perfectionists we are, we have to fix this. This is where
the path of epoxy forks, but lets stick with rmarkdown as normal. We’ll
come back here in a second.

Probably the easiest way to fix this would be to create a new data frame
where we go through all of the columns and format them appropriately.
There are more than a few packages that help with this task, but the
most popular (and probably underrated) package is `{scales}`.

Yay! This is great. I mean, it’s fine. Honestly, if you’re going to do
format your data into text-ready character strings, do it this way. But
you’ve kind of sent your data down a dead-end street because the data to
text transformation only goes one way.

Let’s rewind just a little and take another path. You might think: I’ll
leave my data alone but format it in place. Cool, that makes sense, but
you end up with lots of code written in inline R.

🌶️ spice hot take: write R code where it can be R code. (don’t write R
code in strings, don’t write code inline)

💡 Inline code is only for the simplest code that you absolutely cannot
possibly mess up

#### The epoxy path

1.  `library(epoxy)`
2.  Use an `epoxy` chunk (it’s still markdown! 🤯 )
3.  From `` `r expr` `` to `{expr}`
4.  Now add `{.dollar expr}` and `{.pct expr}` and `{.number expr}`

### epoxy_transform_inline()

1.  Lots of built-in transformations, mostly around `scales::label_*()`
2.  A few useful ones I’ve added, e.g. `.and`, `.or`, `.date`, `.time`
3.  You can make your own! (Show the new easy way, globally with adder)
4.  You can also change the defaults (maybe show `.dollar` as
    `scales::dollar(15234, scale_cut = scales::cut_short_scale(), accuracy = 0.01)`)
5.  All of this is powered by `epoxy_transform()`

## epoxy in scripts

### epoxy and glue

Okay, so epoxy is super-strength glue isn’t just a statement about
categories of adhesive products. Let’s talk about glue a little bit.

1.  glue syntax
2.  epoxy is a drop-in replacement for glue (almost!)
    1.  except for better defaults
    2.  `epoxy()` vs `glue::glue()` with missing and null values
3.  glue is lightweight, zero dependencies, super useful but skews
    toward utility (as an analogy in the home project department, glue
    is a screwdriver)
4.  epoxy is a power drill
5.  Explain the `{expr}` syntax from glue’s perspective, expressions
    come from the environment or data
6.  Sidenote: `glue_data()` is super cool
7.  The expression is transformed from an expression into a character
    string

### epoxy_transform()

There were two early ideas behind epoxy: glue chunks and transformers.
For me this project was the perfect combination of technical challenge
and an interestingly useful idea. The package itself all started to come
together when I figured out how to really take advantage of transformers

1.  Imagine we want to do the same thing to everything in a chunk: make
    all the replacements bold. Neat.
2.  What if we want them to be italic. Also cool.
3.  What if we want them to be bold *and* italic. Uh oh.
4.  Nope, we can do that!
5.  Chained transformations (love too functional programming)
6.  This is technically cool, but on the level of writing a recursive
    function. It’s the world’s least interesting magic trick.
7.  Where it is cool is if you want to turn on something for a chunk,
    you can do `epoxy_transform = "bold"`

### epoxy_html

epoxy comes with two additional chunk engines and R functions,
`epoxy_latex()` and `epoxy_html()`. Basically, they both re-set all of
the defaults to something that works better in each language. LaTeX
loves to throw `{}` around so we use `<` and `>` for delimiters. In
HTML, double braces are more common `{{ }}`.

In both cases, their chunk forms write out raw pandoc chunks, meaning
that the output of an `epoxy_html` chunk only shows up in HTML (or
compatible) documents and the output from `epoxy_latex` chunks only show
up in LaTeX.

I don’t use LaTeX much anymore so I don’t have anything cool to show
off. If you find a cool use case for epoxy in latex, I’d love to hear.

In HTML, though, we can do some pretty cool things:
`{{ <markup> expr }}`, e.g. `{{ li.cool expr }}`. Show this with a few
counties or states.

## epoxy in apps

### epoxy_html() with data

Repeat the first example, but by state. Each row is one state, plugs
into prose that’s one-per-state.

1.  Use `data` chunk option to write out the same thing repeated several
    times but for different states.
2.  Use `ref.label` and `data` chunk to create a template that you write
    out in distant locations.

### ui_epoxy_html()

Let’s take that same idea into a Shiny app. We need a select box to pick
the desired state. And when we do the summary is updated in the app.

-   Take the pattern from the last section and use it in an app, maybe
    with `ui_epoxy_markdown()` if it’s copy-and-paste.

-   Filter down to a row in the data set in the server-side code and
    give `render_epoxy(.list = state_data())`

You can also wrap anything HTML-ish (anything powered by Shiny’s HTML or
UI functions) in a `ui_epoxy_html()`, which lets you include template
variables *anywhere* you would otherwise include text or htmltools tags.
In this case, you can also give named reactive expressions.

Note: you can blend named reactives and `.list` (maybe add state or year
into the prose)

Note: you can’t use the inline transformations in Shiny (yet?)

Note: you can’t use template expressions in attributes (link `href` or
image `src` )

## Beyond glue

One nice thing about using R for templating is that when it gets too
complex, you can just bring to bear all of the high-powered programming
language features in R and *make it so*. (do the logic yourself, compose
the pieces just right, etc.)

That can also be not so great: 90% of your text or UI is in one place
and then something ✨ magical ✨ happens somewhere quite distant and it
all comes together. Hard to debug, hard to reason about, etc.

### Mustache

Mustache is a templating language. Technically it’s billed as a
logic-less templating language, which means it’s only does so much. But
often it’s the right amount of just a little more to allow you to keep
everything together in your template.

The biggest reasons you’d consider using mustache are

1.  Conditionally including pieces based on presence or absence of a
    piece of data.
2.  Need to put data into attributes of HTML, write all the HTML in the
    template.

Show a simple template in Shiny.

## Beyond this talk

-   [Package Docs](https://pkg.garrickadenbuie.com/epoxy/)

-   Would love to hear from you or help you use epoxy! Come to the
    [discussion board](https://github.com/gadenbuie/epoxy/discussions)