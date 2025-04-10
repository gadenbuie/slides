if (FALSE) {
  pak::repo_add("https://rstudio.r-universe.dev")
  pak::pak("bslib")
  pak::pak("sass")
}

if (TRUE) fs::dir_delete("../shinylive")

withr::local_envvar(
  list(SHINYLIVE_DOWNLOAD_WASM_CORE_PACKAGES = "bslib")
)

for (app in c("basic", "bslib", "tmobile")) {
  cli::cli_progress_step(
    "Exporting {.val {app}}",
    msg_done = "Exported {.val {app}}"
  )
  shinylive::export(
    app,
    "../shinylive",
    subdir = app,
    assets_version = "0.10.4"
  )
  cli::cli_process_done()
}
