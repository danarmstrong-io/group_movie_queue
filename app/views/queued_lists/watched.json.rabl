collection @watched_list, :root => "movies", :object_root => false

attributes :id => :queued_movie_id, :oogway_rating => :queued_movie_rating, :time_watched => :time_watched

glue :movie do
	attributes *Movie.column_names
	
end