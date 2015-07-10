class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
    	t.string :title
    	t.integer :year
    	t.datetime :released
    	t.string :runtime
    	t.string :rated
    	t.string :director
        t.string :writer
    	t.string :actors
    	t.text :plot
    	t.string :language
    	t.string :country
    	t.string :awards
    	t.string :poster
    	t.string :metascore
    	t.float :imdbrating
    	t.string :imdbid
        t.integer :imdbvotes

      t.timestamps null: false
    end
  end
end