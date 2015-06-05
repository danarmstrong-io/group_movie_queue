class UsersController < ApplicationController
  respond_to :html, :json, :xml

	def show_current_user
		@user = current_user
	end

	def update_current_user
		puts params
		if current_user.update_attributes(user_params)
			render json: current_user
		else
			render json: 500
		end
	end

	private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :phone, :street_address, :state, :zip, :city)
  end
end