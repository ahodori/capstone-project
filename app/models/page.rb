class Page < ApplicationRecord
    belongs_to :wikiblog
    has_many :page_versions
end
