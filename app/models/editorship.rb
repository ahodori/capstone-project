class Editorship < ApplicationRecord
    belongs_to :user
    belongs_to :wikiblog

    validates :user_id, presence: true
    validates :wikiblog_id, presence: true

    validates :user_id, uniqueness: { scope: :wikiblog_id, message: "Editorship must be unique pairing of user and wikiblog; this editorship likely already exists"}
end
