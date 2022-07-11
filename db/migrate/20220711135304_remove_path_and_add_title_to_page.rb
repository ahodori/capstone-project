class RemovePathAndAddTitleToPage < ActiveRecord::Migration[7.0]
  def change
    remove_column :pages, :path
    add_column :pages, :title, :string
  end
end
