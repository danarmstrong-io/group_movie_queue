collection @pending_list, :root => "movies", :object_root => false

attributes :id => :user_movie_rating_id, :title => :title

glue :movie do
	attributes *Movie.column_names
	
end