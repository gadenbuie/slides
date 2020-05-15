test_that("roll_dice() only rolls 1-6 dice", {
  expect_error(roll_dice(7))
  expect_error(roll_dice(0))
  expect_equal(length(roll_dice(4)), 4)
})
