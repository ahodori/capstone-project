class EditorshipSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :user
  belongs_to :wikiblog
end
