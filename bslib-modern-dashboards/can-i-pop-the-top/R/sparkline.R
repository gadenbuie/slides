plotly_sparkline <- function(
  x,
  y,
  color = "#000000",
  x_axis = list(visible = FALSE, showgrid = FALSE, title = "Time of Day"),
  y_axis = list(visible = FALSE, showgrid = FALSE, title = "Temperature (°F)"),
  add_fn = plotly::add_lines,
  add_args = list()
) {
  plotly::plot_ly() %>%
    add_fn(
      x = x,
      y = y,
      color = I(color),
      span = I(1),
      fill = "tozeroy",
      alpha = 0.2,
      !!!add_args
    ) %>%
    plotly::layout(
      xaxis = x_axis,
      yaxis = y_axis,
      hovermode = "x",
      margin = list(t = 0, r = 0, l = 0, b = 0),
      font = list(color = color),
      paper_bgcolor = "transparent",
      plot_bgcolor = "transparent"
    ) %>%
    plotly::config(displayModeBar = F) %>%
    htmlwidgets::onRender(
      "function(el) {
      el.closest('.bslib-value-box')
        .addEventListener('bslib.card', function(ev) {
          Plotly.relayout(el, {
            'xaxis.visible': ev.detail.fullScreen,
            'yaxis.visible': ev.detail.fullScreen,
          });
        })
    }"
    )
}
