class CreateGamesPlayersTable < ActiveRecord::Migration
  def change
    create_table :games_players, :id => false  do |t|
      t.references :game_id
      t.references :player_id
    end
    add_index(:games_players, [:player_id, :game_id]), :unique => true
  end
end
