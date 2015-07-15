class Movie < ActiveRecord::Base
	has_many :user_movie_ratings
	has_many :queued_movies
	has_many :queued_lists, through: :queued_movies

	has_many :movie_genres
	has_many :genres, through: :movie_genres

	has_many :movie_comments
end
