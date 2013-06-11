class Player < ActiveRecord::Base

  has_and_belongs_to_many :games
  validates_format_of :email, :with => /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i 
  validates :email, :uniqueness => true
end
