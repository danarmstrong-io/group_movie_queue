class QueuedListsController < ApplicationController
  respond_to :html, :json, :xml
  include QueuedListHelper

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

end