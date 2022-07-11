class Wikiblog < ApplicationRecord
    belongs_to :user
    has_many :pages
    has_many :editorships

    validates :name, presence: true
    
    after_create :create_editorship

    private

    def create_editorship
        e = Editorship.create_or_find_by(user_id: self.user.id, wikiblog_id: self.id)
        # if e.valid?
        #     puts "created editorship for wikiblog " + self.id.to_s + " with user " + self.user.id.to_s
        # else
        #     puts "COULDN'T make editorship for wikiblog " + self.id.to_s + " with user " + self.user.id.to_s
        # end
    end
end
