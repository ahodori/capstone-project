class WikiblogSerializer < ActiveModel::Serializer
  attributes :id, :name, :user, :pagenum, :updated

  def user
    {user_id: object.user.id, username: object.user.username}
  end

  def pagenum
    object.pages.length
  end

  def updated
    object.pages.find_by(is_index: true).updated_at
  end

end
