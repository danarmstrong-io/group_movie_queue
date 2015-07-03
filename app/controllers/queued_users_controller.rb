class QueuedUsersController < ApplicationController
  respond_to :html, :json, :xml

	def destroy
		queued_user = QueuedUser.find(params[:id])
		if queued_user.destroy
			render json: queued_user, status: :ok
		else
      render status: :bad_request
		end
	end

end