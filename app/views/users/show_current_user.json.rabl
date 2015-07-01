object @user

attributes :id, :first_name, :last_name, :email

child :incomplete_invites, :object_root => false do
	
	attribute :id
	child :inviter => :inviter do
		attributes :id, :first_name, :last_name, :email
	end

	child :queued_list, :object_root => false do 

		attributes :id, :title
		
		child :users, :object_root => false do
			attributes :id, :first_name, :last_name, :email
		end

	end
end