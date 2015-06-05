class QueuedMovieUserRating < ActiveRecord::Base
	belongs_to :user_movie_rating
	belongs_to :queued_movie
end
