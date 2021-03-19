Rails.application.routes.draw do
  resources :comments, only: [:index, :show, :create]
  resources :places, only: [:index, :show, :create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
