class UserMovieRatingsController < ApplicationController
	before_action :authenticate_user!
  respond_to :html, :json, :xml

	def update
		user_movie_rating = UserMovieRating.find(params[:id])
		if user_movie_rating.update_attributes(user_movie_rating_params)
			user_movie_rating.complete!
  		render json: user_movie_rating, status: :ok
  	else
  		render status: :bad_request
  	end
	end

	private

	def user_movie_rating_params
    params.permit(:rating, :seen, :rewatch, :favorite)
	end

end