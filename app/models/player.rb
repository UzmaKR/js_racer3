class Player < ActiveRecord::Base
  validates_presence_of :name, :email
  validates_format_of :email, :with => /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i 
  validates :email, :uniqueness => true

  has_and_belongs_to_many :games
end
