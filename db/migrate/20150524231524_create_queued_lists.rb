class CreateQueuedLists < ActiveRecord::Migration
  def change
    create_table :queued_lists do |t|
    	t.string :title

      t.timestamps null: false
    end
  end
end
