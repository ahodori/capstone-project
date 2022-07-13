Rails.application.routes.draw do
  resources :page_versions
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :editorships, only: [:create, :destroy]
  resources :pages, only: [:show, :create, :destroy]
  resources :page_versions, only: [:create]
  resources :wikiblogs, only: [:index, :show, :create, :destroy]
  resources :users, only: [:show, :create]

  get "/me", to: "users#show_session"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
