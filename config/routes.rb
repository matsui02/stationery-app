Rails.application.routes.draw do
  root "top#index"
  devise_for :users, controllers: {
  registrations: "users/registrations",
  sessions: "users/sessions"
  }
  get '/accounts', to: 'accounts#show', as: :accounts
end
