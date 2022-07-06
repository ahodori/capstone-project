class PageVersion < ApplicationRecord
    belongs_to :page
    belongs_to :user #user who submitted edit that created this version of the page
end
