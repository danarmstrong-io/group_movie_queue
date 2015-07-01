Rails.application.routes.draw do
  devise_for :users

  root 'dashboard#index'

  scope :api, defaults: {format: :json} do
    scope :v1 do
      get 'queued_list_ready/:id' => 'queued_lists#ready'
      get 'queued_list_pending' => 'queued_lists#pending'
      resources :queued_lists, only: [:index, :show, :create] do
        resources :queued_movies, only: [:create]
      end
      resources :users, only: [:show]
      get 'show_current_user' => 'users#show_current_user'
      put 'update_current_user' => 'users#update_current_user'
      get 'show_by_email' => 'users#show_by_email'
      post 'accept_invite/:id' => 'list_invites#accept'
      post 'reject_invite/:id' => 'list_invites#reject'

      resources :user_movie_ratings, only: [:update]
    end
  end
end