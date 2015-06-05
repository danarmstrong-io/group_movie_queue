class Movie < ActiveRecord::Base
	has_many :user_movie_ratings
	has_many :queued_movies
	has_many :queued_lists, through: :queued_movies
end
