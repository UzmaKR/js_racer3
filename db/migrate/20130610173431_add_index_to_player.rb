class AddIndexToPlayer < ActiveRecord::Migration
  def change
    add_index :players, :email
  end
end
