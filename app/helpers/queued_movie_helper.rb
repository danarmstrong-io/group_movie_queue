module QueuedMovieHelper

  def create_user_movie_ratings(queued_list, movie, current_user, queued_movie, current_user_rating)
  	find_or_create_user_movie_ratings_and_add_to_movie(movie, current_user, queued_movie, current_user_rating)
  	queued_list.users.each do |user|
  		find_or_create_user_movie_ratings_and_add_to_movie(movie, user, queued_movie)
  	end
  end

  def find_or_create_user_movie_ratings_and_add_to_movie(movie, user, queued_movie, rating = {})
		user_movie_rating = UserMovieRating.find_or_create_by(movie_id: movie.id, user_id: user.id)
		user_movie_rating.update_attributes(rating)
    
    if user_movie_rating[:rating]
      user_movie_rating.complete! 
    end
		queued_movie.user_movie_ratings << user_movie_rating
  end
  
end