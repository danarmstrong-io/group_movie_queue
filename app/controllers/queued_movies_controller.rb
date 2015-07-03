class QueuedMoviesController < ApplicationController

	def create
		mp = movie_params
		rating = mp.delete(:rating)
		list = QueuedList.find(params[:queued_list_id])
		movie = Movie.find_or_create_by(title: params[:title])
		movie.update_attributes(mp)
		list.movies << movie
		queued_movie = QueuedMovie.find_by_queued_list_id_and_movie_id(list.id, movie.id)
		umr = UserMovieRating.find_by_movie_id_and_user_id(movie.id, current_user.id)
		unless umr
			umr = UserMovieRating.create
			umr.movie_id = movie.id
			umr.user_id = current_user.id
			umr.save
		end 
		umr.movie_id = movie.id
		umr.user_id = current_user.id
		umr.rating = rating["rating"]
		umr.seen = rating["seen"]
		umr.rewatch = rating["rewatch"]
		umr.favorite = rating["favorite"]
		umr.completed = true
		umr.save
		queued_movie.user_movie_ratings << umr
		queued_movie.save
		list.users.each do |user|
			unless UserMovieRating.find_by_movie_id_and_user_id(movie.id, user.id)
				umr = UserMovieRating.create(movie_id: movie.id, user_id: user.id)
				queued_movie.user_movie_ratings << umr
			end
		end
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

	def movie_params
    params.permit(:imdbid, :imdbvotes, :imdbrating, :metascore, :poster, :awards, :country, :language, :plot, :actors, :writer, :director, :genre, :runtine, :released, :rated, :year, :title, rating: [:id, :rating, :seen, :rewatch, :favorite])
  end
  
end