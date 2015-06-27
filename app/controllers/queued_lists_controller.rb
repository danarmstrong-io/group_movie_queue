class QueuedListsController < ApplicationController
  respond_to :html, :json, :xml

  def index
  	@queued_lists = current_user.queued_lists
  end

  def show
  	@queued_list = QueuedList.find(params[:id])
  end

	def ready
		@queued_list = QueuedList.find(params[:id])
    20.times {puts @queued_list.title}
    @queued_list
	end

	def pending
		@pending_list = current_user.pending_ratings
	end

  def create
    queued_list = QueuedList.create()
    queued_list.users << current_user
    params[:invitees].each do |invitee|
      if user = User.find_by_email(invitee["email"])
        queued_list.users << user
      else
        20.times {puts "usernotfound"}
      end
    end
    if queued_list
      render json: {queued_list: queued_list}, status: :ok
    else
      render status: :bad_request
    end
  end

end