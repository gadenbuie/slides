# epoxy: super glue for data-driven reports and Shiny apps

**posit::conf(2023)** \
Wednesday, Sep 20 \
3:00 PM - 3:20 PM CDT (4:00 PM EDT)

## Links

* <https://posit.co/conference>
* [Conference Schedule](https://reg.conf.posit.co/flow/posit/positconf23/attendee-portal/page/sessioncatalog?mkt_tok=NzA5LU5YTi03MDYAAAGMOwicGJrhtXda51Y3t137gvS39KmHIqNuI1Xjs-YZ62mna1IWSn1ZGwB8R18yo6gticxgLE5xrYmm4C7U7QgBDCJ8M40a5T1BGCjsSQdM32k)
* [Add talk to schedule](https://reg.conf.posit.co/flow/posit/positconf23/attendee-portal/page/sessioncatalog?mkt_tok=NzA5LU5YTi03MDYAAAGMOwicGJrhtXda51Y3t137gvS39KmHIqNuI1Xjs-YZ62mna1IWSn1ZGwB8R18yo6gticxgLE5xrYmm4C7U7QgBDCJ8M40a5T1BGCjsSQdM32k&search=garrick)

## Abstract

R Markdown, Quarto, and Shiny are powerful frameworks that allow authors to create data-driven reports and apps. Authors blend prose and data, without having to copy and paste results. This is fantastic! But truly excellent reports require a lot of work in the final inch to get numerical and stylistic formatting *just right*.

{epoxy} is a new package that uses {glue} to give authors templating super powers. First, authors can use epoxy chunks to write sentences or paragraphs in markdown with glue-like inline variables. Then, they can use inline formatting for common numerical or character transformations.

Epoxy works in R Markdown and Quarto, in markdown, LaTeX and HTML outputs. It also provides easy templating for Shiny apps for dynamic data-driven reporting. Beyond epoxy's features, this talk will also touch on tips and approaches for data-driven reporting that will be useful to a wide audience, from R Markdown experts to the Quarto and Shiny curious.

## Outline (draft)

When you
connect data to your prose with inline formatting
reusable (template)
wherever you explain data,
you'll be able to
write polished, data-driven reports and apps
that help you
tell your story and connect with your audience.

### Connect data to your prose

- Big quote with a number
    - But how did that number get there?
    - Not copy and paste.
    - There was some R code that took some data and calculated that number.
    - And then when we wrote about it, we used an inline R chunk to insert the number into the text.

- The promise and magic of R Markdown:
    - connecting your data with your prose
    - makes your document reproducible
    - that render into PDFs, websites, HTML, Word, slides, and more

- But... When you render it's actually not great

- epoxy syntax first contact
    - From inline chunk to epoxy chunk
    - From backticks to curly braces
    - Then add in `.dollar` to format the number

- inline-formatting
    - Pre-built options
        - e.g. `.emph`, `.strong`, `.pct`, `.comma`
    - Can be nested
        - `{.strong {.dollar value}}`
    - Can be customized
        - Choosing defaults for `.pct`
    - Can bring your own
        - Replace `.dollar` with `.euro`

### Reusable

- In a re-usable way
    - Chunks are vectorized!
        - Self-templating
        - Use `.data` option
    - Or re-use a chunk or file as a template

### Wherever you explain data

- In knitr chunks
    - we've seen general purpose markdown chunks
    - auto-complete in chunks is pretty neat
    - latex chunks: changes the delimiters
    - html chunks: changes delimiters & adds HTML transformations

- Powered by `glue`, inspired by `cli`
    - Built on the glue package for developers
    - But with all the batteries included
    - And inspired by the cli package
    - which means...

- Everything we've seen can be used in R scripts too
    - `epoxy()`
    - `epoxy_html()`
    - `epoxy_latex()`
    - chunk options === arguments

### And also Shiny!

- `ui_epoxy_html()`
    - Use the `{{ }}` syntax (from `epoxy_html()`) in any UI element
- `render_epoxy()`
    - Send specific values to regions of the UI, updated reactively
- Profit.

### But wait, there's more...

There is (mustache templates)!
But that's enough for this talk.
Check out the package site.
Tell great stories with your words and your data.
