class CreateQueuedMovies < ActiveRecord::Migration
  def change
    create_table :queued_movies do |t|
    	t.integer :movie_id
    	t.integer :queued_list_id
    	t.boolean :completed, default: false
    	t.float :oogway_rating

      t.timestamps null: false
    end
  end
end
