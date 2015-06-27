object @queued_list

attributes :oogway_rating, :title

glue :movie do
	attributes *Movie.column_names
end

child :user_movie_ratings, :object_root => false do
	attributes *UserMovieRating.column_names
	glue :user do
	  attributes id: :user_id, first_name: :first_name, last_name: :last_name
	end
end

