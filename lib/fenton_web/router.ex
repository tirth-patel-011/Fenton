defmodule FentonWeb.Router do
  use FentonWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :put_root_layout, html: {FentonWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/", FentonWeb do
    pipe_through :browser

    get "/", PageController, :home
  end
end
