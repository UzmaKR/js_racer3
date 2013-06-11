class CreateGameTable < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :winner
      t.string :player1
      t.string :player2
    end
  end
end
