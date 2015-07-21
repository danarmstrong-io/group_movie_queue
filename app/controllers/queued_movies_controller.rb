class QueuedMoviesController < ApplicationController
  respond_to :html, :json, :xml
  include QueuedMovieHelper

	def create
		queued_list = QueuedList.find(params[:queued_list_id])
		movie = Movie.find(user_movie_rating_params[:movie_id])
		queued_movie = QueuedMovie.create(queued_list: queued_list, movie: movie)
		create_user_movie_ratings(queued_list, movie, current_user, queued_movie, user_movie_rating_params)
		queued_movie.check_if_complete
  	render json: queued_movie, status: :ok
	end

	def update
		queued_movie = QueuedMovie.find(params[:id])
		queued_movie.set_watched_and_all_users_reevalutate
		render json: queued_movie, status: :ok
	end

	def unwatch
		queued_movie = QueuedMovie.find(params[:id])
		queued_movie.update_attributes(watched: false)
		render json: queued_movie, status: :ok
	end

	private

  def user_movie_rating_params
    params.require(:user_movie_rating).permit(:id, :rating, :seen, :rewatch, :favorite, :movie_id)
  end
  
end