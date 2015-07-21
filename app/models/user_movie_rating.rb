class UserMovieRating < ActiveRecord::Base
	belongs_to :user
	belongs_to :movie
	has_many :queued_movie_user_ratings
	has_many :queued_movies, through: :queued_movie_user_ratings

	before_save :update_queued_movies

	def check_if_complete
		self.complete! if self[:rating]
	end

	def complete!
		self.update_attributes(completed: true)
		update_queued_movies
	end

	def update_queued_movies
		self.queued_movies.each do |queued_movie|
			queued_movie.check_if_complete
		end
	end
end
