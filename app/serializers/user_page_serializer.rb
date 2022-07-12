class UserPageSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :wikiblogs
end
