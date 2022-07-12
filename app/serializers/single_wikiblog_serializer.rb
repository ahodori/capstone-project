class SingleWikiblogSerializer < ActiveModel::Serializer
  attributes :id, :name, :user
  has_many :pages
  has_many :editorships
end
