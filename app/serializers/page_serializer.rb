class PageSerializer < ActiveModel::Serializer
  attributes :id, :text, :title, :is_index, :updated
  def text
    object.text[0]
  end

  def updated
    object.page_versions.find_by(is_current_version: true).updated_at
  end
end
