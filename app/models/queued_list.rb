class QueuedList < ActiveRecord::Base
	has_many :queued_users
	has_many :users, through: :queued_users

	has_many :queued_movies
	has_many :movies, through: :queued_movies

	def ready_movies
		self.queued_movies.where(completed: true)
	end

	def pending_movies
		self.queued_movies.where(completed: false)
	end
end
