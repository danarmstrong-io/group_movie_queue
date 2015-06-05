object @queued_list

attribute :id

child :users, :object_root => false do
	attributes :id, :first_name
end

child :ready_movies, :object_root => false do
	attributes :oogway_rating

	glue :movie do
	attributes *Movie.column_names
	end

	child :user_movie_ratings, :object_root => false do
		attributes *UserMovieRating.column_names
		glue :user do
		  attributes id: :user_id, first_name: :first_name, last_name: :last_name
		end
	end
end