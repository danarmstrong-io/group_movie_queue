class QueuedList < ActiveRecord::Base
	has_many :queued_users
	has_many :users, through: :queued_users

	has_many :queued_movies
	has_many :movies, through: :queued_movies

	has_many :list_invites
	has_many :invited_users, through: :list_invites, source: :invitee
	has_many :defaulted_users, class_name: "User"

	def ready_movies
		self.queued_movies.where(completed: true).where(watched: false)
	end

	def pending_movies
		self.queued_movies.where(completed: false)
	end

	def watched_movies
		self.queued_movies.where(watched: true).order(time_watched: :desc)
	end

	def incomplete_invites
		self.list_invites.where(completed: false)
	end
end