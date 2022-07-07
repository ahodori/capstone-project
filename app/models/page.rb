class Page < ApplicationRecord
    belongs_to :wikiblog
    has_many :page_versions

    def text
        current_version = page_versions.where(is_current_version: true)
        current_version.text if current_version
        ""
    end
end
