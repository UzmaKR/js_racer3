class CreatePlayerTable < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :name
      t.string :email
    end
  end
end
