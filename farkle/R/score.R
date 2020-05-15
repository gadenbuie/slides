count_dice <- function(dice) {
  dplyr::tibble(value = dice) %>%
    dplyr::count(value) %>%
    dplyr::arrange(value)
}

# Straights ----
has_straight <- function(dice_counted) {
  if (nrow(dice_counted) != 6) return(FALSE)
  if (all(dice_counted$value == 1:6) & all(dice_counted$n == 1)) {
    TRUE
  } else FALSE
}

identify_straight <- function(...) {
  tibble(value = 1:6, use = 1)
}

score_straight <- function(...) {
  tibble(used = 6, score = 1500)
}

# 3 Pairs ----
has_3_pair <- function(dice_counted) {
  if (sum(dice_counted$n) != 6) return(FALSE)
  all(dice_counted$n == 2) ||
    identical(sort(dice_counted$n), c(2L, 4L))
}

identify_3_pair <- function(dice_counted) {
  dice_counted %>% rename(use = n)
}

score_3_pair <- function(...) {
  tibble(used = 6, score = 1500)
}

# 4-6 of a kind ----
has_4_6_of_kind <- function(dice_counted) {
  if (nrow(dice_counted) < 4) return(FALSE)
  any(dice_counted$n >= 4)
}

identify_4_6_of_kind <- function(dice_counted) {
  dice_counted %>%
    filter(n >= 4) %>%
    rename(use = n)
}

score_4_6_of_kind <- function(dice_identified) {
  n <- dice_identified$use
  tibble(used = n,  score = (n - 3) * 1000)
}

# 3 of a kind ---
has_3_of_kind <- function(dice_counted) {
  if (sum(dice_counted$n) < 3) return(FALSE)
  any(dice_counted$n == 3)
}

identify_3_of_kind <- function(dice_counted) {
  # get largest dice value first
  dice_counted %>%
    filter(n == 3) %>%
    tail(n = 1) %>%
    transmute(value, use = 3)
}

score_3_of_kind <- function(dice_identified) {
  tibble(used = 3, score = dice_identified$value * 100)
}

# one/five ----
has_one_five <- function(dice_counted) {
  if (nrow(dice_counted) == 0) return(FALSE)
  one_five <- dice_counted %>%
    filter(value %in% c(1, 5))
  sum(one_five$n) > 0
}

identify_one_five <- function(dice_counted) {
  dice_counted %>%
    mutate(row = row_number()) %>%
    filter(value %in% c(1, 5)) %>%
    slice(1) %>%
    transmute(value, use = 1)
}

score_one_five <- function(dice_identified) {
  value <- dice_identified$value
  n <- dice_identified$use
  if (value == 1) {
    tibble(used = n, score = 100)
  } else if (value == 5) {
    tibble(used = n, score = 50)
  }
}


# Roll Dice ---------------------------------------------------------------

#' Roll Dice
#'
#' It rolls 1 through six dice.
#'
#' @param n Number of dice to roll
#' @export
roll_dice <- function(n) {
  if (!n %in% 1:6) {
    stop("Can't roll ", n, " dice, must choose from 1 - 6 die to roll.")
  }
  sample(1:6, n, replace = TRUE)
}

check_valid_roll <- function(dice) {
  if (any(dice > 6) || any(dice < 1)) {
    stop("You must use 6-sided dice for Farkle")
  }
  if (length(dice) > 6 || length(dice) < 1) {
    stop("You must roll 1 to 6 dice")
  }
}

# Use Dice ----------------------------------------------------------------
use_dice <- function(dice_counted, dice_used) {
  left_join(dice_counted, dice_used, by = "value") %>%
    mutate(use = ifelse(is.na(use), 0, use)) %>%
    transmute(value, n = n - use) %>%
    filter(n > 0)
}

# Score Roll --------------------------------------------------------------
score_roll <- function(dice) {
  check_valid_roll(dice)
  n_dice <- length(dice)
  dice_counted <- count_dice(dice)

  score <- NULL

  if (has_straight(dice_counted)) {
    dice_used <- identify_straight()
    score <- bind_rows(score, score_straight())
    dice_counted <- use_dice(dice_counted, dice_used)
  }

  if (has_3_pair(dice_counted)) {
    dice_used <- identify_3_pair(dice_counted)
    score <- bind_rows(score, score_3_pair())
    dice_counted <- use_dice(dice_counted, dice_used)
  }

  if (has_4_6_of_kind(dice_counted)) {
    dice_used <- identify_4_6_of_kind(dice_counted)
    score <- bind_rows(score, score_4_6_of_kind(dice_used))
    dice_counted <- use_dice(dice_counted, dice_used)
  }

  while(has_3_of_kind(dice_counted)) {
    dice_used <- identify_3_of_kind(dice_counted)
    score <- bind_rows(score, score_3_of_kind(dice_used))
    dice_counted <- use_dice(dice_counted, dice_used)
  }

  while(has_one_five(dice_counted)) {
    dice_used <- identify_one_five(dice_counted)
    score <- bind_rows(score, score_one_five(dice_used))
    dice_counted <- use_dice(dice_counted, dice_used)
  }

  if (!is.null(score)) {
    score %>%
      mutate(
        used = cumsum(used),
        score = cumsum(score)
      ) %>%
      mutate(remaining = n_dice - used)
  } else {
    tibble(used = integer(), score = integer(), remaining = integer())
  }
}


# Strategy ----------------------------------------------------------------
strategy_go_for_broke <- function(dice_scored, ...) {
  # always choose highest score and to roll remaining die
  tail(dice_scored, 1) %>%
    mutate(keep_going = TRUE)
}

strategy_prefer_max_dice <- function(dice_scored, ...) {
  if (tail(dice_scored$remaining, 1) == 0) {
    strategy_go_for_broke(dice_scored)
  } else {
    head(dice_scored, 1) %>%
      mutate(keep_going = TRUE)
  }
}

strategy_prefer_threes <- function(dice_scored, ...) {
  if (any(dice_scored$remaining >= 3)) {
    dice_scored %>%
      filter(remaining >= 3) %>%
      tail(1) %>%
      mutate(keep_going = TRUE)
  } else {
    strategy_prefer_max_dice(dice_scored)
  }
}

strategy_prefer_fours <- function(dice_scored, ...) {
  if (any(dice_scored$remaining >= 4)) {
    dice_scored %>%
      filter(remaining >= 4) %>%
      tail(1) %>%
      mutate(keep_going = TRUE)
  } else {
    strategy_prefer_threes(dice_scored)
  }
}

strategy_mine <- function(dice_scored, current_score) {
  if (dice_scored$remaning[[1]] == 0) {
    return(dice_scored %>% mutate(keep_going = TRUE))
  }

}

# Play a Round ------------------------------------------------------------

play_round <- function(choose_dice) {
  roll_results <- list()
  n_rolls <- 0L
  n_dice_in_hand <- 6L
  keep_going <- TRUE
  while(keep_going) {
    n_rolls <- n_rolls + 1L
    dice_rolled <- roll_dice(n_dice_in_hand)
    dice_scored <- score_roll(dice_rolled)

    if (nrow(dice_scored) == 0) {
      # Farkle!
      keep_going <- FALSE
      dice_held <- tibble(used = 0, score = 0, remaining = -1)
    } else {
      dice_held <- choose_dice(dice_scored)
      keep_going <- dice_held$keep_going
      n_dice_in_hand <- dice_held$remaining
      if (n_dice_in_hand == 0) {
        # roll all 6 dice again
        n_dice_in_hand <- 6
      }
    }
    roll_results[[n_rolls]] <- list(
      roll = n_rolls,
      rolled = list(dice_rolled),
      scored = list(dice_scored),
      held = list(dice_held)
    )
  }
  bind_rows(roll_results)
}


# Simulate ----------------------------------------------------------------

simulate_farkle <- function(iters, strategy, parallel = FALSE) {
  if (parallel) {
    future::plan(future::multisession)
  } else {
    future::plan(future::sequential)
  }
  tibble(round = seq_len(iters)) %>%
    mutate(rolls = furrr::future_map(round, ~ play_round(strategy), .progress = TRUE)) %>%
    tidyr::unnest(rolls) %>%
    tidyr::unnest(held) %>%
    group_by(round) %>%
    mutate(total = cumsum(score)) %>%
    ungroup()
}


# Summarize ---------------------------------------------------------------

summarize_perfect_strategy <- function(results) {
  results %>%
    ungroup() %>%
    select(-scored) %>%
    mutate(n_rolled = map_int(rolled, length)) %>%
    group_by(round) %>%
    mutate(
      round_score = max(total),
      roll_score_delta = lag(round_score - total),
      roll_score_delta = coalesce(roll_score_delta, round_score)
    ) %>%
    group_by(n_rolled) %>%
    summarize(
      n = n(),
      n_fails = sum(is.na(keep_going)),
      average_marginal_score = mean(roll_score_delta)
    ) %>%
    mutate(
      p_fail = n_fails / n,
      p_ok = 1 - p_fail,
      stop_if_over = average_marginal_score / p_fail
    )
}
