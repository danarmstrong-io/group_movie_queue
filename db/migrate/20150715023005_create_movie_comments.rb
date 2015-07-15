class CreateMovieComments < ActiveRecord::Migration
  def change
    create_table :movie_comments do |t|
    	t.integer :user_id
    	t.integer :movie_id
    	t.text :text

      t.timestamps null: false
    end
  end
end
