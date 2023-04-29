class BadgesController < ApplicationController
  def new
    @badge = Badge.new
  end

  def show
    @badge = Badge.find_by_slug!(params[:id])
  end

  def print
    chosen_id = params[:id]
    chosen_badge = Badge.find_by_slug(chosen_id)
    chosen_badges = Array.new(6, chosen_badge)
    random_badges = Badge.order("RANDOM()").first(6)

    @badges = chosen_badges + random_badges

    render layout: false
  end

  def create
    badge = Badge.new(badge_params)
    badge.colors = JSON.parse(badge.colors)
    badge.slug = generate_unique_ish_slug
    if badge.save
      redirect_to badge
    end
  end

  private

  def badge_params
    params.require(:badge).permit(:name, :creator_name, :colors)
  end

  def generate_unique_ish_slug
    chars = Array('A'..'Z') + Array('a'..'z')
    Array.new(7) { chars.sample }.join
  end
end
