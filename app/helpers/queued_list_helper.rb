module QueuedListHelper
  def add_self_and_invite_users(queued_list)
    queued_list.users << current_user
    if params[:invitees]
      params[:invitees].each do |invitee|
        find_or_email_and_add_user_to(queued_list, invitee)
      end
    end
  end

  def find_or_email_and_add_user_to(queued_list, invitee)
    user = User.find_by_email(invitee["email"])
    if user
      if user != current_user && !queued_list.users.include?(user) && !queued_list.invited_users.include?(user)
        list_invite = ListInvite.create(inviter: current_user, invitee: user, queued_list: queued_list)
      end
    else
      email_new_user(invitee["email"])
    end
  end

  def email_new_user(email)
    3.times {puts "NEED TO IMPLEMENT EMAIL TO NEW USER"}
  end

  def remove_duplicates_and_current_user
    params[:invitees].each do |invitee|
      if invitee["email"] == current_user.email
        params[:invitees].delete(invitee)
      end
    end
    params[:invitees].uniq!
  end
end
