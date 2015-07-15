collection @comments, :object_root => false

attributes :id, :text, :created_at

child :user do
	attributes :id, :first_name, :last_name
end