scoring <- tribble(
  ~ roll, ~ score,
  "Single 5", 50,
  "Single 1", 100,
  "3 x N of a kind", "N * 100",
  "4:6 of a Kind", "(n - 3) * 1000",
  "3 Pairs", 1500,
  "Straight", 2500
)

score_dice <- function(dice) {
  n_dice <- length(dice)
  dice <- sort(as.integer(dice))
  dice_counts <- unname(table(dice))
  dice_values <- unique(dice)
  if (identical(dice, 1:6)) {
    return(tibble(used = 6, remaining = 0, score = 2500))
  }
  if (n_dice == 6 && all(dice_counts == 2)) {
    return(tibble(used = 6, remaining = 0, score = 1500))
  }
  score <- NULL
  if (n_dice > 3) {
    # 4 through 6 of a kind
    for (n_pairs in rev(4:n_dice)) {
      if (n_pairs %in% dice_counts) {
        score <- bind_rows(score,
                           tibble(used = n_pairs, score = (n_pairs - 3) * 1000)
        )
        dice_counts[which(dice_counts == n_pairs)] <- 0
      }
    }
  }
  if (any(dice_counts == 3)) {
    # 3 of a kind
    for (idx in which(dice_counts == 3)) {
      value <- dice_values[idx]
      # three ones is 300
      if (value == 1) value <- 3
      score <- bind_rows(score,
                         tibble(used = 3, score = value * 100)
      )
      dice_counts[idx] <- 0
    }
  }
  if (any(dice_counts[dice_values %in% c(1, 5)] > 0)) {
    idx_one_five <- which(dice_values %in% c(1, 5))
    idx_one_five <- idx_one_five[dice_counts[idx_one_five] > 0]
    for (idx in idx_one_five) {
      for (i in seq_len(dice_counts[idx])) {
        points <- if (dice_values[idx] == 5) 50 else 100
        score <- bind_rows(score, tibble(used = 1, score = points))
        dice_counts[idx] <- dice_counts[idx] - 1
      }
    }
  }
  return(score)
}
