class MovieCommentsController < ApplicationController
  respond_to :html, :json, :xml

	def index
		@comments = Movie.find(params[:movie_id]).movie_comments.order("created_at DESC")
	end

	def create
		comment = MovieComment.create(movie_id: params[:movie_id], user: current_user, text: params[:comment])
    render json: comment, status: :ok 
	end

	def destroy
		comment = MovieComment.find(params[:id])
		if comment[:user_id] == current_user.id && comment.destroy
    	render json: comment, status: :ok 
    else
    	render json: comment, status: :unauthorized
    end
	end

end