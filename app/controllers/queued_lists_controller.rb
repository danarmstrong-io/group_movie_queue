class QueuedListsController < ApplicationController
  respond_to :html, :json, :xml

  def show
  	@queued_list = QueuedList.find(params[:id])
  end

	def ready
		@queued_list = QueuedList.find(params[:id])
	end

	def pending
		@pending_list = current_user.pending_ratings
	end

end