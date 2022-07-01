Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :editorships
  resources :pages
  resources :wikiblogs
  resources :users, only: [:show, :create]

  get "/me", to: "users#show_session"

end
