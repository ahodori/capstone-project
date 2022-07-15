class Page < ApplicationRecord
    belongs_to :wikiblog
    has_many :page_versions

    after_validation :set_index, on: [:create]

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

    def updated
        current_version = page_versions.where(is_current_version: true)
        current_version.pluck(:updated_at).to_s
    end

    private

    def set_index
        past_index = Page.where(wikiblog_id: self.wikiblog.id, is_index: true)
        if past_index
            past_index.each do |page|
                page.update(is_index: false)
            end
        end
        self.is_index = true
    end
end
