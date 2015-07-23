class UserMovieRating < ActiveRecord::Base

	belongs_to :user
	belongs_to :movie

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

	def queued_movies
		self.user.queued_movies.where(movie: self.movie)
	end

end