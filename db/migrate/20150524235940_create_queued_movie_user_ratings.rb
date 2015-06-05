class CreateQueuedMovieUserRatings < ActiveRecord::Migration
  def change
    create_table :queued_movie_user_ratings do |t|

    	t.integer :queued_movie_id
    	t.integer :user_movie_rating_id

      t.timestamps null: false
    end
  end
end
