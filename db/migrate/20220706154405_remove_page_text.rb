class RemovePageText < ActiveRecord::Migration[7.0]
  def change
    remove_column :pages, :text
    add_belongs_to :page_versions, :user
  end
end
