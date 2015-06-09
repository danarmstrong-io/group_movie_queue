collection @queued_lists, :object_root => false

attributes :id

child :users, :object_root => false do
	attributes :id, :email, :first_name, :last_name
end