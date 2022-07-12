class PageSerializer < ActiveModel::Serializer
  attributes :id, :text, :title, :is_index
  def text
    object.text[0]
  end
end
