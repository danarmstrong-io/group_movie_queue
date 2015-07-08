class DashboardController < ApplicationController
	before_action :authenticate_user!

	def index
		if current_user.queued_lists.length == 1
			@queued_list = current_user.queued_lists[0]
		elsif current_user.default_list
			@queued_list = current_user.default_list
		end
	end

end