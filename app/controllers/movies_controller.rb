class MoviesController < ApplicationController
  respond_to :html, :json, :xml

	def show
		@movie = Movie.find_by(imdbid: params[:imdb_id])
	end

	def search
		
	end

end