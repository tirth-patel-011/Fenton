defmodule FentonWeb.ErrorHTML do
  @moduledoc """
  This module is invoked by your endpoint in case of errors on HTML requests.
  """
  use FentonWeb, :html

  # By default, Phoenix renders a plain text page based on the template name,
  # e.g. "404.html" becomes "Not Found", "500.html" becomes "Internal Server Error".
  def render(template, _assigns) do
    Phoenix.Controller.status_message_from_template(template)
  end
end
