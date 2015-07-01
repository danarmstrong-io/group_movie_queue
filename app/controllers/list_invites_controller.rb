class ListInvitesController < ApplicationController
  respond_to :html, :json, :xml

	def accept
		list_invite = ListInvite.find(params[:id])
		list_invite.update_attribute(:completed, true)
		unless list_invite.queued_list.users.include?(current_user)
			list_invite.queued_list.users << current_user
		end
    render json: list_invite.queued_list, status: :ok 
	end

	def reject
		list_invite = ListInvite.find(params[:id])
		list_invite.update_attribute(:completed, true)
    render json: list_invite, status: :ok 
	end

end