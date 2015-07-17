module QueuedMovieHelper

  def create_or_find_all_genres_and_add_to_movie(genres, movie)
		genres.split(', ').each do |genre|
			movie.genres << Genre.find_or_create_by(name: genre)
		end
  end

  def find_or_create_user_movie_rating_and_add_to_movie(movie, user, queued_movie)
		user_movie_rating = UserMovieRating.find_or_create_by(movie_id: movie.id, user_id: user.id)
		user_movie_rating.update_attributes(user_movie_rating_params)
		queued_movie.user_movie_ratings << user_movie_rating
  end
  
end