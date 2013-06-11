class CreateGamesPlayersTable < ActiveRecord::Migration
  def change
    create_table :games_players, :id => false  do |t|
      t.references :game
      t.references :player
    end
    add_index :games_players, [:player_id, :game_id], :unique => true
  end
end
