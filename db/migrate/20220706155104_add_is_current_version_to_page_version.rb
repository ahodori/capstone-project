class AddIsCurrentVersionToPageVersion < ActiveRecord::Migration[7.0]
  def change
    add_column :page_versions, :is_current_version, :boolean
  end
end
