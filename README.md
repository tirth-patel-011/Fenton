# Fenton — Latest News (Phoenix)

A small [Phoenix](https://www.phoenixframework.org/) web app that displays the
**"Latest News"** section recreated from the Illustrator working file
`Fenton_Fitzwilliam_New_Webb_WorkingFiles.ai`.

It shows:

- the colourful brand banner strip,
- a **featured article** ("A new era for packaging…"), and
- three **article cards** ("Spend now or pay later…").

The original artwork images are included under `priv/static/images/`.

---

## ⚠️ Why this wasn't run in the cloud session

This project was scaffolded inside Claude Code on the web, where the Elixir
package server (`repo.hex.pm`) is **blocked by the environment's network
policy**. That means the Phoenix dependencies could not be downloaded, so the
app could not be compiled or started there. Run it on your own machine using
the steps below (where there is normal internet access).

---

## Requirements

- **Elixir** ~> 1.14 and **Erlang/OTP** (install via <https://elixir-lang.org/install.html>)
- Internet access to fetch dependencies from hex.pm the first time

> No database is required — this app only renders a static page.

## Run it locally

```bash
# 1. Install the Hex package manager and the build tool (first time only)
mix local.hex --force
mix local.rebar --force

# 2. Fetch dependencies (downloads Phoenix etc. from hex.pm)
mix deps.get

# 3. Start the server
mix phx.server
```

Then open **<http://localhost:4000>** in your browser.

To run inside an interactive Elixir shell instead:

```bash
iex -S mix phx.server
```

## Project layout

```
lib/
  fenton/application.ex              # OTP application + supervision tree
  fenton_web.ex                      # shared controller/html helpers
  fenton_web/
    endpoint.ex                      # HTTP entrypoint (Bandit)
    router.ex                        # routes ("/" -> PageController.home)
    controllers/
      page_controller.ex             # holds the article content/data
      page_html.ex
      page_html/home.html.heex       # the "Latest News" markup
    components/layouts/
      root.html.heex                 # <html> shell + fonts + CSS link
config/                              # dev / prod / runtime configuration
priv/static/
  assets/app.css                     # styling for the section
  images/                            # banner + article images from the .ai file
```

## Editing the content

The headlines and body copy live in
`lib/fenton_web/controllers/page_controller.ex` (the `@featured` and
`@articles` module attributes). The layout/styling lives in
`priv/static/assets/app.css`.
