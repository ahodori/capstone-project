class Page < ApplicationRecord
    belongs_to :wikiblog
    has_many :page_versions

    def text
        current_version = page_versions.where(is_current_version: true)
        return current_version.pluck(:text) if current_version
        return ""
    end

    def mergeable_edits
        current_version = page_versions.where(is_current_version: true)
        future_versions = page_versions.where("updated_at > ?", current_version.pluck(:updated_at))
        future_versions
    end
end
