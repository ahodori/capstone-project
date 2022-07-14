class PageSerializer < ActiveModel::Serializer
  attributes :id, :text, :title, :is_index, :updated
  def text
    object.text[0]
  end

  def updated
    current_version = object.page_versions.find_by(is_current_version: true)
    if current_version
      current_version.updated_at
    else
      ""
    end
  end
end
