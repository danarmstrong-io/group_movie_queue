object @queued_list

attributes :id, :title

child :users, :object_root => false do
	attributes :id, :first_name
end

child :ready_movies, :object_root => false do
	attributes :oogway_rating

	glue :movie do
		attributes *Movie.column_names
	end

	node :current_user_movie_rating do |movie|
		UserMovieRating.find_by_movie_id_and_user_id(movie.id, @current_user.id)
	end

	child :user_movie_ratings, :object_root => false do |rating|
		attributes *UserMovieRating.column_names
		glue :user do
		  attributes id: :user_id, first_name: :first_name, last_name: :last_name
		end
	end
end