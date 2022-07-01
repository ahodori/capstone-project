class CreatePages < ActiveRecord::Migration[7.0]
  def change
    create_table :pages do |t|
      t.string :path
      t.text :text
      t.boolean :is_index
      
      t.belongs_to :wikiblog

      t.timestamps
    end
  end
end
