class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :user_movie_ratings

  has_many :queued_users
  has_many :queued_lists, through: :queued_users

  # def not_current_user?
  # 	self.id != current_user.id
  # end
end
