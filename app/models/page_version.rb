class PageVersion < ApplicationRecord
    belongs_to :page
    belongs_to :user #user who submitted edit that created this version of the page

    validates :page_id, presence: true
    validates :user_id, presence: true
    validates :text, presence: true

    after_validation :set_current_version, on: [:create]

    private

    def set_current_version
        past_current_version = PageVersion.where(page_id: self.page_id, is_current_version: true)
        #should only be one current version set, but to capture bugs check all

        if past_current_version
            past_current_version.each do |pageversion|
                pageversion.update(is_current_version: false)
            end
        end

        self.is_current_version = true
    end
end
