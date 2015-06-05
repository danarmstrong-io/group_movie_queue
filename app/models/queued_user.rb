class QueuedUser < ActiveRecord::Base
	belongs_to :user
  belongs_to :queued_list
end
