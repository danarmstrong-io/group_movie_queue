class UserMovieRating < ActiveRecord::Base
	belongs_to :user
	belongs_to :movie
	has_many :queued_movie_user_ratings
	has_many :queued_movies, through: :queued_movie_user_ratings
end
