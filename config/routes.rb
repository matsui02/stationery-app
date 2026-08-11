Rails.application.routes.draw do
  root "top#index"
  devise_for :users
  get "/accounts", to: "accounts#show", as: :accounts
  resources :pencil_cases, only: [ :index, :show, :new, :create, :edit, :update, :destroy ]
  namespace :api do
    get "items/search", to: "items#search"
    post "items",        to: "items#create"
    delete "items/:id",    to: "items#destroy"
  end
end
