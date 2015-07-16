class QueuedList < ActiveRecord::Base
	has_many :queued_users
	has_many :users, through: :queued_users

	has_many :queued_movies
	has_many :movies, through: :queued_movies

	has_many :genres, -> { uniq }, through: :movies

	has_many :list_invites
	has_many :invited_users, through: :list_invites, source: :invitee
	has_many :defaulted_users, class_name: "User"

	validates :title, length: { maximum: 36 }

	def ready_movies
		self.queued_movies.where(completed: true).where(watched: false)
	end

	def not_watched_queued_movies
		self.queued_movies.where(watched: false)
	end

	def not_watched_movies
		not_watched_queued_movies.includes(:movie).map(&:movie)
	end

	def not_watched_movie_genres
		genres = []
		self.not_watched_movies.each { |movie|
			movie.genres.each do |genre|
				genres.push(genre) unless genres.include?(genre)
			end
		}
		genres
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