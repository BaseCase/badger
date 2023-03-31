Rails.application.routes.draw do
  root "home#index"

  get "/new", to: "badges#new"

  resources :badges, only: [:create]
end
