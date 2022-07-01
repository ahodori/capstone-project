class Wikiblog < ApplicationRecord
    belongs_to :user
    has_many :pages
    has_many :editorships
end
