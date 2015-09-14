class QueuedMovie < ActiveRecord::Base

	belongs_to :queued_list
	belongs_to :movie
	has_many :users, through: :queued_list

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
		self.completed = incomplete_user_movie_ratings.length == 0
		self.save
	end

	def incomplete_user_movie_ratings
		self.user_movie_ratings.where(completed: false)
	end

	def complete_user_movie_ratings
		self.user_movie_ratings.where(completed: true)
	end

	def calculate_oogway_rating
		return 0 if complete_user_movie_ratings.length == 0
		complete_user_movie_ratings.inject(0) {|sum, rating| sum + rating.rating} / complete_user_movie_ratings.length
	end

	def user_movie_ratings
		UserMovieRating.where(user: self.users).where(movie_id: self.movie[:id])
	end

end
