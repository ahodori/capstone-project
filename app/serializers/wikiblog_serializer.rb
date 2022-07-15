class WikiblogSerializer < ActiveModel::Serializer
  attributes :id, :name, :user, :pagenum, :updated

  def user
    {id: object.user.id, username: object.user.username}
  end

  def pagenum
    object.pages.length
  end

  def updated
    object.pages.find_by(is_index: true).updated
  end

end
