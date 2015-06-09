class CreateUserMovieRatings < ActiveRecord::Migration
  def change
    create_table :user_movie_ratings do |t|
    	t.integer :rating
    	t.boolean :seen, default: false
    	t.boolean :rewatch, default: false
    	t.boolean :favorite, default: false
    	t.integer :movie_id
    	t.integer :user_id
    	t.text :comment
      t.boolean :completed, default: false

      t.timestamps null: false
    end
  end
end
