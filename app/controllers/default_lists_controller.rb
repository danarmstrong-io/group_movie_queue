class DefaultListsController < ApplicationController
  respond_to :html, :json, :xml

	def update
		current_user.update_attributes(default_list_id: params[:id])
    render json: current_user, status: :ok 
	end

	def destroy
		current_user.update_attributes(default_list_id: nil)
    render json: current_user, status: :ok 
	end

end