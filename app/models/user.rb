class User < ApplicationRecord
    has_secure_password

    has_many :wikiblogs
    has_many :editorships

    validates :username, presence: true
    validates :username, uniqueness: true
end
