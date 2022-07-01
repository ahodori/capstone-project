class PageSerializer < ActiveModel::Serializer
  attributes :id, :path, :text, :is_index
end
