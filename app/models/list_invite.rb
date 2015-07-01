class ListInvite < ActiveRecord::Base
	belongs_to :queued_list
	belongs_to :inviter, class_name: "User"
	belongs_to :invitee, class_name: "User"
end