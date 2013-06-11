get '/' do
  erb :index
end

post '/game' do
  @player1 = Player.find_or_create_by_email(email: params[:player1][:email], name: params[:player1][:name])
  @player2 = Player.find_or_create_by_email(email: params[:player2][:email], name: params[:player2][:name])
  
  erb :game
end

post '/game/results' do
  game = Game.create(winner: params["winner"], player1: params["player1"], player2: params["player2"])
  @winner = params["winner"]
  p @winner
  @player1 = Player.find_by_name(game.player1)
  @player2 = Player.find_by_name(game.player2)
  game.players << @player1
  game.players << @player2
  erb :results, :layout => false
end
