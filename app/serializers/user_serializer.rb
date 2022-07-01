class UserSerializer < ActiveModel::Serializer
  attributes :id, :string, :password_digest, :is_admin
end
