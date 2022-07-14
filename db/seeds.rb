# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'faker'

User.destroy_all
Editorship.destroy_all
Wikiblog.destroy_all
Page.destroy_all
PageVersion.destroy_all


u1 = User.create(username: "albert", password: "123", password_confirmation: "123", is_admin: true)
u2 = User.create(username: "bartholomew", password: "1234", password_confirmation: "1234")
u3 = User.create(username: "cassius", password: "12345", password_confirmation: "12345")
u4 = User.create(username: "dorcas", password: "123456", password_confirmation: "123456")
u5 = User.create(usernane: "edgar", password: "1234567", password_confirmation: "1234567")
u6 = User.create(usernane: "falconhoof", password: "12345678", password_confirmation: "12345678")

user_ids = User.pluck(:id)

(0..5).each do |i|
    w = Wikiblog.create(name: Faker::App.name, user_id: user_ids.sample)
    p = Page.create(title: Faker::Hobby.activity, is_index: true, wikiblog_id: w.id);
    pv = PageVersion.create(text: Faker::Markdown.sandwich(sentences: 6, repeat: 3), page_id: p.id, user_id: w.user.id, is_current_version: true)
end

wikiblog_ids = Wikiblog.pluck(:id)

#Create editorships NOT linked to wikiblog creator
(0..3).each do |i|
    Editorship.create(wikiblog_id: wikiblog_ids.sample, user_id: user_ids.sample)
end

#create 10 random pages
(0..10).each do |i|
    p = Page.create(title: Faker::Hobby.activity, wikiblog_id: wikiblog_ids.sample)
    pv = PageVersion.create(text: Faker::Markdown.sandwich(sentences: 6, repeat: 3), page_id: p.id, user_id: p.wikiblog.user.id, is_current_version: true)
end

page_ids = Page.pluck(:id)

#create 15 random pageversions on random pages
(0..15).each do |i|
    p = Page.find(page_ids.sample)
    editors = p.wikiblog.editorships.pluck(:id)
    editor = Editorship.find(editors.sample).user_id
    pv = PageVersion.create(text: Faker::Markdown.sandwich(sentences: 6, repeat: 3), page_id: p.id, user_id: editor)
    unless pv.valid?
        pp pv.errors.full_messages
    end
end

w1 = Wikiblog.create(name: "My blog 1", user_id: u1.id)

p1 = Page.create(title: "my page 1", is_index: true, wikiblog_id: w1.id)

pv1 = PageVersion.create(text: "hi", page_id: p1.id, user_id: p1.wikiblog.user.id, is_current_version: false)
pv2 = PageVersion.create(text: "hi 2", page_id: p1.id, user_id: p1.wikiblog.user.id, is_current_version: true)
pv3 = PageVersion.create(text: "hi 3", page_id: p1.id, user_id: p1.wikiblog.user.id, is_current_version: false)
pv4 = PageVersion.create(text: "hi 4", page_id: p1.id, user_id: p1.wikiblog.user.id, is_current_version: false)

e1 = Editorship.create(wikiblog_id: w1.id, user_id: u2.id)