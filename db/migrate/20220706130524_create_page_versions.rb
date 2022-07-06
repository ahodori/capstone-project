class CreatePageVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :page_versions do |t|
      t.text :text
      t.belongs_to :page

      t.timestamps
    end
  end
end
