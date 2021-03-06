class CreateQueuedMovies < ActiveRecord::Migration
  def change
    create_table :queued_movies do |t|
    	t.integer :movie_id
    	t.integer :queued_list_id
    	t.boolean :completed, default: false
    	t.boolean :watched, default: false
      t.datetime :time_watched, default: nil
    	t.float :oogway_rating, default: 0

      t.timestamps null: false
    end
  end
end
