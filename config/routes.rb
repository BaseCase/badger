Rails.application.routes.draw do
  root "home#index"

  get "/about", to: "home#about"

  get "/new", to: "badges#new"

  resources :badges, only: [:show, :create] do
    get "print", on: :member
  end
end
