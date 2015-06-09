Rails.application.routes.draw do
  devise_for :users

  root 'dashboard#index'

  scope :api, defaults: {format: :json} do
    get 'queued_list_ready/:id' => 'queued_lists#ready'
    get 'queued_list_pending' => 'queued_lists#pending'
    resources :queued_lists, only: [:index, :show] do
      resources :queued_movies, only: [:create]
    end
    resources :users, only: [:show]
    get 'show_current_user' => 'users#show_current_user'
    put 'update_current_user' => 'users#update_current_user'

    resources :user_movie_ratings, only: [:update]
    # get 'user_pending_movies/:id' => 'queued_movies#pending'
    # get 'user_rated_movies/:id' => 'queued_movies#rated'
  end
end
