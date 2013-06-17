function Player(name, key) {
    this.name = name;
    this.keyCode = key.charCodeAt(0);
    this.position = 0;
}

Player.prototype.move = function() {
  this.position++;
};

  function Board() {}
  Board.prototype.render = function(player1, player2) {
    $('td').removeClass('active');
    $('tr').first().find('td').eq(player1.position).addClass('active');
    $('tr').last().find('td').eq(player2.position).addClass('active');
  }

  Board.prototype.renderWinner = function(htmlBody) {
    $('.winning-msg').append(htmlBody);
  }

  function ConsoleBoard() {}
  ConsoleBoard.prototype.render = function(player1, player2) {
    console.log("Player 1 position ==>" + player1.position);
    console.log("Player 2 position ==>" + player2.position); 
  }
  ConsoleBoard.prototype.renderWinner = function(htmlBody) {
    console.log(htmlBody);
  }

function Game(player1, player2) {
    this.active = true;
    this.winner = 0;
    this.trackLength = 13;  //number of table cells
    this.player1 = player1;
    this.player2 = player2;
    this.board = new ConsoleBoard();
    this.board.render(player1, player2);

  }

  // Game.prototype = {
  //   playGame: function() {}
  // }

  Game.prototype.saveGameAndDeclareWinner = function(winner) {
    var self = this;
    this.active = false;
    $.ajax({
      url: '/game/results',
      type: 'post',
      data: { winner: this.winner.name, player1: this.player1.name, player2: this.player2.name }
    }).done(function(htmlBody) {
      console.log(htmlBody);
      self.board.renderWinner(htmlBody);
    })
  };

  Game.prototype.onKeyUp = function(e) {
    if ( this.active ) {
      if ( this.player1.position === this.trackLength-1 ) {
        this.winner = this.player1;
        this.saveGameAndDeclareWinner(this.winner);
      } else if ( this.player2.position === this.trackLength-1 ) {
        this.winner = this.player2;
        this.saveGameAndDeclareWinner(this.winner);
      } else {
        if (e.keyCode === this.player1.keyCode) {
          this.player1.move();
        }  else if (e.keyCode === this.player2.keyCode) {
          this.player2.move();
        }
      }
      this.board.render(this.player1, this.player2);
    } 
  }


$(document).ready(function(){

  var player1Name = $('tr').first().attr('id');
  var player2Name = $('tr').last().attr('id');

  var player1 = new Player(player1Name, "P");
  var player2 = new Player(player2Name, "Q");

  var game = new Game(player1, player2);
  
  $(document).on('keyup', function(e) { game.onKeyUp(e); });
});

