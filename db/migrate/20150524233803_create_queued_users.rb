class CreateQueuedUsers < ActiveRecord::Migration
  def change
    create_table :queued_users do |t|
    	t.integer :user_id
    	t.integer :queued_list_id

      t.timestamps null: false
    end
  end
end
