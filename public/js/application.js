$(document).ready(function(){

  function save_game_results() {
    console.log("did i get in?");
    var winner = "";
    var p1_id = $('#player1_strip').attr('class');
    var p2_id = $('#player2_strip').attr('class');
     if ( $('#player1_strip').children().last().hasClass('p1-active') ) {
        winner = 'P';
     } else {
       winner = 'Q';
     }
     $.ajax({
       type: 'POST',
       url: '/game',
       data: { winner: winner, p1_id: p1_id, p2_id: p2_id }
     }).done(function(htmlTemplate){
      $('body').html(htmlTemplate);
     })



     // .success(function(chicken){
     //  $("body").html(chicken);
     // })

  }


  $(document).on('keyup', function(e) {
    var p1 = $('#player1_strip').find('.p1-active');
    var p2 = $('#player2_strip').find('.p2-active');
    if ( $('#player1_strip').children().last().hasClass('p1-active') ) {
      save_game_results();
      return $('.winning-msg').text('The winner is P !!');
    }
    if ( $('#player2_strip').children().last().hasClass('p2-active') ) {
      save_game_results();
      return $('.winning-msg').text('The winner is Q !');
    }

    if (e.keyCode === "P".charCodeAt(0)) {
      p1.toggleClass('p1-active');
      p1.text("");
      p1.next().toggleClass('p1-active');
      p1.next().text("P1");
    }
    if (e.keyCode === "Q".charCodeAt(0)) {
      p2.toggleClass('p2-active');
      p2.text("");
      p2.next().toggleClass('p2-active');
      p2.next().text("P2");
    }
  });

});
