class QueuedMovie < ActiveRecord::Base
	has_many :queued_users
	has_many :users, through: :queued_users

	has_many :queued_movie_user_ratings
	has_many :user_movie_ratings, through: :queued_movie_user_ratings
	
	belongs_to :queued_list
	belongs_to :movie

	def complete!
		self.completed = true
		self.oogway_rating = calculate_oogway_rating
		self.save
	end

	def check_if_complete
		if incomplete_user_movie_ratings.length == 0
			self.complete!
		end
	end

	def incomplete_user_movie_ratings
		self.user_movie_ratings.where(completed:false)
	end

	def calculate_oogway_rating
		sum = 0
		self.user_movie_ratings.each do |movie_user_rating|
			sum += movie_user_rating.rating
		end
		sum / self.user_movie_ratings.length
	end
end
