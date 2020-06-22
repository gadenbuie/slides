res <- simulate_farkle(10000, strategy_go_for_broke, parallel = TRUE)

res_max_dice <- simulate_farkle(10000, strategy_prefer_max_dice, parallel = TRUE)

res_three <- simulate_farkle(10000, strategy_prefer_threes, parallel = TRUE)

res_four <- simulate_farkle(10000, strategy_prefer_fours, parallel = TRUE)

list(
  "Go For Broke" = summarize_strategy(res),
  "Prefer Threes" = summarize_strategy(res_three),
  "Prefer Fours" = summarize_strategy(res_four),
  "Maximize Dice to Roll" = summarize_strategy(res_max_dice)
) %>%
  purrr::map_dfr(~ ., .id = "strategy") %>%
  ggplot() +
  aes(n_rolled, stop_if_over, color = strategy) +
  geom_line() +
  coord_cartesian(ylim = c(0, 5250))
