get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/play' do 
  p params


end
