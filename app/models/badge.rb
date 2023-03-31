class Badge < ApplicationRecord
  def to_param
    slug
  end
end
