enable :sessions

get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/play' do 
  p params
  if session[:name1] && session[:email1]
    session[:name2] = params[:name]
    session[:email2] = params[:email]
    @game = Game.create(:player1 => session[:name1],
                        :email1  => session[:email1],
                        :player2 => session[:name2],
                        :email2  => session[:email2])
    redirect '/game'
  else
    session[:name1] = params[:name]
    session[:email1] = params[:email]
  end

  
  

  redirect '/' unless session[:name2] && session[:email2]
end

get '/game' do
  erb :game
end
