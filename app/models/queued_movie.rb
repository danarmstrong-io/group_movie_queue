class QueuedMovie < ActiveRecord::Base
	has_many :queued_users
	has_many :users, through: :queued_users

	has_many :queued_movie_user_ratings
	has_many :user_movie_ratings, through: :queued_movie_user_ratings
	
	belongs_to :queued_list
	belongs_to :movie

	before_save :apply_oogway_rating

	def set_watched_and_all_users_reevalutate
		self.update_attributes(watched: true, time_watched: Time.now)
		self.user_movie_ratings.each do |user_movie_rating|
			user_movie_rating.update_attributes(completed: false, seen: true)
		end
	end

	def complete!
		self.completed = true
		self.save
	end

	def apply_oogway_rating
		self.oogway_rating = calculate_oogway_rating
	end

	def check_if_complete
		if incomplete_user_movie_ratings.length == 0
			self.complete!
		end
		self.save
	end

	def incomplete_user_movie_ratings
		self.user_movie_ratings.where(completed:false)
	end

	def calculate_oogway_rating
		sum = 0
		self.user_movie_ratings.each do |movie_user_rating|
			sum += movie_user_rating.rating
		end
		rating = sum / self.user_movie_ratings.length.to_f
	end
end
