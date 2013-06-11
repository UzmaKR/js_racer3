$(document).ready(function(){

  function Player(name) {
    this.name = name;
  }

  Player.prototype.move = function() {
    var target = '#' + this.name;

    var location = $(target).find('.active'); 
    location.removeClass('active');
    location.next().addClass('active');
  };

  var player1 = new Player(($('tr').first().attr('id')));
  var player2 = new Player(($('tr').last().attr('id')));



  function Game(winner, player1, player2) {
    this.winner = 0;
    this.player1 = player1;
    this.player2 = player2;
  }

  Game.prototype.call_server = function(winner) {
      $.ajax({
      url: '/game/results',
      type: 'post',
      data: {winner: winner.name, player1: player1.name, player2: player2.name}
    }).done(function(htmlBody) {
      console.log(htmlBody);
      $('.winning-msg').append(htmlBody);
    })
  };

  Game.prototype.keyHandler = function(e) {
    if (e.keyCode === "P".charCodeAt(0)) {
      player1.move();
    } else if (e.keyCode === "Q".charCodeAt(0)) {
      player2.move();
    }
  }

  Game.prototype.wrapupGame = function(winner) {
    $(document).off('keyup');
    Game.prototype.call_server(winner);
  }

  Game.prototype.playGame = function() {
    this.reset();
    $(document).on('keyup', function(e){
      if ($('tr').first().children().last().hasClass('active')) {
        winner = player1;
        Game.prototype.wrapupGame(winner);
      }
      if ($('tr').last().children().last().hasClass('active')) {
        winner = player2;
        Game.prototype.wrapupGame(winner);
      }
      Game.prototype.keyHandler(e);
    });
  };
  
  
  Game.prototype.reset = function() {
    $('td').removeClass('active');
    $('tr').first().children().first().addClass('active');
    $('tr').last().children().first().addClass('active');
  };

  var new_game = new Game(0,player1, player2, 0);
  new_game.playGame();
});

