plotly_sparkline <- function(
  x,
  y,
  color = "#000000",
  x_title = "Time of Day",
  y_title = "Temperature (°F)",
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
      xaxis = list(visible = FALSE, showgrid = FALSE, title = x_title),
      yaxis = list(visible = FALSE, showgrid = FALSE, title = y_title),
      hovermode = "x",
      margin = list(t = 0, r = 0, l = 0, b = 0),
      font = list(color = color),
      paper_bgcolor = "transparent",
      plot_bgcolor = "transparent"
    ) %>%
    plotly::config(displayModeBar = F) %>%
    htmlwidgets::onRender(
      "function(el) {
        const vb = el.closest('.bslib-value-box')
        if (!vb) {
          Plotly.relayout(el, {
            'xaxis.visible': true,
            'yaxis.visible': true,
          });
        } else {
          vb.addEventListener('bslib.card', function(ev) {
            Plotly.relayout(el, {
              'xaxis.visible': ev.detail.fullScreen,
              'yaxis.visible': ev.detail.fullScreen,
            });
          })
        }
      }"
    )
}
