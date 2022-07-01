# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.destroy_all
Editorship.destroy_all
Wikiblog.destroy_all
Page.destroy_all


u1 = User.create(username: "albert", password: "123", password_confirmation: "123", is_admin: true)
u2 = User.create(username: "bobert", password: "1234", password_confirmation: "1234")
u3 = User.create(username: "cbert", password: "12345", password_confirmation: "12345")
u4 = User.create(username: "dbert", password: "123456", password_confirmation: "123456")

w1 = Wikiblog.create(name: "My blog 1", user_id: u1.id)

p1 = Page.create(path: "/", text: "hi", is_index: true, wikiblog_id: w1.id)

e1 = Editorship.create(wikiblog_id: w1.id, user_id: u2.id)