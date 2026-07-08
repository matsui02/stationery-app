Rails.application.routes.draw do
  root "top#index"
  devise_for :users
  get '/accounts', to: 'accounts#show', as: :accounts
end
