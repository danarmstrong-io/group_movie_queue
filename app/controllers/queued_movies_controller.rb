class QueuedMoviesController < ApplicationController
  respond_to :html, :json, :xml
  include QueuedMovieHelper

	def create
		queued_list = QueuedList.find(params[:queued_list_id])
		movie = Movie.find_or_create_by(imdbid: movie_params[:imdbid])
		movie.update_attributes(movie_params)
		create_or_find_all_genres_and_add_to_movie(genre_params, movie)
		queued_movie = QueuedMovie.find_or_create_by(queued_list: queued_list, movie: movie)
		find_or_create_user_movie_ratings_and_add_to_movie(movie, current_user, queued_movie)
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

	def movie_params
    params.require(:movie).permit(:imdbid, :imdbvotes, :imdbrating, :metascore, :poster, :awards, :country, :language, :plot, :actors, :writer, :director, :runtime, :released, :rated, :year, :title)
  end

  def user_movie_rating_params
    params.require(:user_movie_rating).permit(:id, :rating, :seen, :rewatch, :favorite)
  end

  def genre_params
    params.require(:genres)
  end
  
end