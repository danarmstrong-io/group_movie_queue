class User < ActiveRecord::Base
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :default_list, class_name: "QueuedList"

  has_many :user_movie_ratings

  has_many :queued_users
  has_many :queued_lists, through: :queued_users
  has_many :queued_movies, -> { uniq }, through: :queued_lists

  has_many :list_invites, foreign_key: :invitee_id
  has_many :invited_to_queued_lists, through: :list_invites, source: :queued_list

  has_many :comments
  
  def pending_ratings
    self.user_movie_ratings.where(completed: false)
  end

  def incomplete_invites
    self.list_invites.where(completed: false)
  end
end
