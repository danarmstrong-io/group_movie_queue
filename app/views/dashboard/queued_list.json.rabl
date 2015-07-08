object @queued_list

attributes :id, :title

child :queued_users, :object_root => false do
	attribute :id => :queued_user_id
	glue :user do
		attributes :id, :first_name, :last_name, :email
	end
end

glue :users do
	attributes :id, :first_name, :last_name, :email
end

child :ready_movies, :object_root => false do
	attributes :id => :queued_movie_id, :oogway_rating => :oogway_rating

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

child :incomplete_invites, :object_root => false do
	attribute :id => :list_invite_id
	glue :invitee do
		attributes :id => :user_id, :first_name => :first_name,  :last_name => :last_name, :email => :email
	end
end