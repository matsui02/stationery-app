Rails.application.routes.draw do
  root "top#index"
  devise_for :users, controllers: {
  registrations: "users/registrations",
  sessions: "users/sessions"
  }
  get '/accounts', to: 'accounts#show', as: :accounts
  resources :pencil_cases
  namespace :api do
    get "items/search", to: "items#search"
    post "items",        to: "items#create"
    delete "items/:id",    to: "items#destroy"
  end
end
