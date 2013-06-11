class Game < ActiveRecord::Base
  # Remember to create a migration!
  has_and_belongs_to_many :players
  # validate :game_has_exactly_two_players

  

  # def game_has_exactly_two_players
    # if session[:players].lenth <= 2 && session[:players].lenth > 0
      # true 
      # errors.add(:name, "Cannot have more than 2 players.")


end
