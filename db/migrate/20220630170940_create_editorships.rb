class CreateEditorships < ActiveRecord::Migration[7.0]
  def change
    create_table :editorships do |t|
      t.belongs_to :wikiblog
      t.belongs_to :user

      t.timestamps
    end
  end
end
