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
    @current_user = current_user
    render status: :unauthorized unless current_user.queued_lists.include?(@queued_list)
	end

  def watched
    @watched_list = QueuedList.find(params[:id]).watched_movies
  end

	def pending
		@pending_list = current_user.pending_ratings
	end

  def create
    queued_list = QueuedList.new(title: params["title"])
    remove_duplicates_and_current_user if params[:invitees]
    add_self_and_invite_users(queued_list)

    if queued_list.save
      render json: queued_list, status: :ok 
    else
      render status: :bad_request
    end
  end

  def update
    queued_list = QueuedList.find(params[:id])
    queued_list.update_attributes(title: params[:title])
    render json: queued_list, status: :ok 
  end

  def add_user
    queued_list = QueuedList.find(params[:queued_list_id])
    list_invite = find_or_email_and_add_user_to(queued_list, params["invitee"])
    render json: list_invite, status: :ok 
  end

  def destroy
    queued_list = QueuedList.find(params[:id])
    if queued_list.users.include?(current_user) && queued_list.destroy
      render json: queued_list, status: :ok
    else
      render status: :unauthorized
    end
  end

  private

  def add_self_and_invite_users(queued_list)
    queued_list.users << current_user
    if params[:invitees]
      params[:invitees].each do |invitee|
        find_or_email_and_add_user_to(queued_list, invitee)
      end
    end
  end

  def find_or_email_and_add_user_to(queued_list, invitee)
    user = User.find_by_email(invitee["email"])
    if user
      if user != current_user && !queued_list.users.include?(user) && !queued_list.invited_users.include?(user)
        list_invite = ListInvite.create(inviter: current_user, invitee: user, queued_list: queued_list)
      end
    else
      email_new_user(invitee["email"])
    end
  end

  def email_new_user(email)
    3.times {puts "NEED TO IMPLEMENT EMAIL TO NEW USER"}
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