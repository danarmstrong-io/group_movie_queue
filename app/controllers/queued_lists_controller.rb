class QueuedListsController < ApplicationController
  respond_to :html, :json, :xml

  def show
  	@queued_list = QueuedList.find(params[:id])
  end

	def ready
		@queued_list = QueuedList.find(params[:id])
	end

	def pending
		@queued_list = QueuedList.find(params[:id])
		@pending_lists = @queued_list.pending_movies
	end

end