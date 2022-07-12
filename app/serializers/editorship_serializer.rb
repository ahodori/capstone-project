class EditorshipSerializer < ActiveModel::Serializer
  attributes :id, :user, :wikiblog
  def user
    {id: object.user.id, username: object.user.username}
  end
  def wikiblog
    {id: object.wikiblog.id, name: object.wikiblog.name}
  end
end
