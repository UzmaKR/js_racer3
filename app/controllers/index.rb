enable :sessions

get '/' do
  session[:players] = []
  # p session[:players]
  # Look in app/views/index.erb
  erb :player1
end


post '/player1' do
  # p params
  # if player 1 does not exist
  if !(Player.find_by_email(params[:player1][:email]))
    # if session[:players].empty? 
      @player1 = Player.new(params[:player1])
      if @player1.save
        session[:players] << @player1.id
      # p session[:players]
        erb :player2
      else 
        redirect '/'
      end
    # end
  else  # if player 1 already exists
    session[:players] << Player.find_by_email(params[:player1][:email]).id
    erb :player2
  end

end

post '/player2' do
  if !(Player.find_by_email(params[:player2][:email]))
    @player2 = Player.new(params[:player2])
    if @player2.save
      session[:players] << @player2.id
      @players = session[:players].dup
      p @players
      erb :game
    else
      erb :player2
    end
  else
    @players = session[:players].dup
    session[:players] << Player.find_by_email(params[:player2][:email]).id
    erb :game
  end
end

post '/game' do
  p params
  if params["winner"] == "P"
    winner = params["p1_id"]
  else
    winner = params["p2_id"]
  end

  game = Game.create(winner: winner.to_i,
                      player1: params["p1_id"].to_i,
                      player2: params["p2_id"].to_i)
  @player1 = Player.find(game.player1)
  @player2 = Player.find(game.player2)

  @player1.games
  @player2.games
  game.players << @player1
  game.players << @player2
  erb :results, :layout => false
  #success 200
  #failure 300-500
end


