class HomeController < ApplicationController
  def index
    @badges = Badge.order(created_at: :desc)
  end

  def about
  end
end
