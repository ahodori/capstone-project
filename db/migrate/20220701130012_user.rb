class User < ActiveRecord::Migration[7.0]
  def change
    change_table(:users) do |t|
      t.column :username, :string
      t.remove :string
    end    
  end
end
