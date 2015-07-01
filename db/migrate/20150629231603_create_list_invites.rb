class CreateListInvites < ActiveRecord::Migration
  def change
    create_table :list_invites do |t|
    	t.boolean :completed, default: false

    	t.integer :inviter_id
    	t.integer :invitee_id
    	t.integer :queued_list_id

      t.timestamps null: false
    end
  end
end
