class CreateGameTable < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :winner
      t.integer :player1
      t.integer :player2
      
    end
  end
end
