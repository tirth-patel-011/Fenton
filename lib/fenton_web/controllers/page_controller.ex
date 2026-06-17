defmodule FentonWeb.PageController do
  use FentonWeb, :controller

  # The featured article shown at the top of the "Latest News" section.
  @featured %{
    image: "/images/featured.png",
    title: "A new era for packaging: Why industry engagement is critical to meeting EU waste targets.",
    body:
      "The PPWR will bring new recycling and waste-reduction requirements, and Ireland " <>
        "will need strong collaboration between Government and industry to meet them. With " <>
        "national plans now being updated, packaging manufacturers have a key opportunity to " <>
        "shape a practical path to compliance."
  }

  # The three smaller article cards below the featured story.
  @articles [
    %{
      image: "/images/article-1.png",
      title: "Spend now or pay later: the real economics of community engagement.",
      excerpt:
        "Why “minimum compliance” community engagement is a false economy in Irish " <>
          "infrastructure. Community engagement comes across as something to be"
    },
    %{
      image: "/images/article-2.png",
      title: "Spend now or pay later: the real economics of community engagement.",
      excerpt:
        "Why “minimum compliance” community engagement is a false economy in Irish " <>
          "infrastructure. Community engagement comes across as something to be"
    },
    %{
      image: "/images/article-3.png",
      title: "Spend now or pay later: the real economics of community engagement.",
      excerpt:
        "Why “minimum compliance” community engagement is a false economy in Irish " <>
          "infrastructure. Community engagement comes across as something to be"
    }
  ]

  def home(conn, _params) do
    render(conn, :home, featured: @featured, articles: @articles)
  end
end
