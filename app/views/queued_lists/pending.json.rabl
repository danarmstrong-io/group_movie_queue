collection @pending_list, :root => "movies", :object_root => false

attributes :id => :user_movie_rating_id, :title => :title, :seen => :seen, :favorite => :favorite, :rating => :rating

glue :movie do
	attributes *Movie.column_names
	child :genres do
		attributes :id, :name
	end
end