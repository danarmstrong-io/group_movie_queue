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
	end

	def pending
		@pending_list = current_user.pending_ratings
	end

  def create
    queued_list = QueuedList.create(title: params["title"])
    remove_duplicates_and_current_user
    find_or_email_and_add_users_to(queued_list)

    if queued_list
      render json: queued_list, status: :ok 
    else
      render status: :bad_request
    end
  end


  private

  def find_or_email_and_add_users_to(queued_list)
    queued_list.users << current_user
    params[:invitees].each do |invitee|
      if user = User.find_by_email(invitee["email"])
        if user != current_user
          queued_list.users << user
        end
      else
        # email them invite
      end
    end
  end

  def remove_duplicates_and_current_user
    params[:invitees].each do |invitee|
      if invitee["email"] == current_user.email
        params[:invitees].delete(invitee)
      end
    end
    params[:invitees].uniq!
  end

end