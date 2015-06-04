
function Player(playerName, score, turnScore) {
  this.playerName = playerName;
  this.score = score;
  this.turnScore = turnScore;
}

// rollScore refers to one roll of the dice
// turnScore refers to the total amount of points added from several rolls of the dice
// score refers to total score

Player.prototype.rollDie = function(){
  var rollScore = 0
  var diceArray = []

  var dice1 = Math.floor(Math.random()*(7-1)+1);
  var dice2 = Math.floor(Math.random()*(7-1)+1);

  if (dice1 !== 1 && dice2 !== 1){
    var totalDice = dice1 + dice2;
    rollScore = totalDice;
    this.turnScore += rollScore;

  }else{
    this.turnScore = 0;
  };

  diceArray.push(dice1, dice2);
  return diceArray;
};

Player.prototype.stop = function() {
  this.score += this.turnScore
  this.turnScore = 0;

}

Player.prototype.newTurn = function() {
  this.turnScore = 0;
};

Player.prototype.scoreCheck = function() {
  if(this.score >= 10){
    return "Win";
  };
};

Player.prototype.newGame = function() {
  this.turnScore = 0;
  this.score = 0;


}

var hideRowAndButtons = function(){
  $(".first-row").hide();
  $(".buttons-1").hide();
  $(".buttons-2").hide();
}

var showRowAndPlayer1Button = function(){
  $(".first-row").fadeIn("fast");
  $(".buttons-1").fadeIn("slow");
}

var showPlayer2Button = function(){
  $(".buttons-1").fadeOut("slow");
  $(".buttons-2").fadeIn("slow");
}

var showPlayer1Button = function(){
  $(".buttons-2").fadeOut("slow");
  $(".buttons-1").fadeIn("slow");
}

var getDicePicture = function(number){
  number = number.toString()
  return '<img class="die-pic" src="css/' + number + '.jpg" />'
}

var getRandomPig = function(){
  number = Math.random(Math.floor(Math.random() * 9) + 1)
  return '<img class="pig-pic" src="css/' + number + 'pig.jpg" />'

}



$(document).ready(function() {

  hideRowAndButtons();


  $("#player-name-form").submit(function(event) {
    event.preventDefault();

    showRowAndPlayer1Button();

    var player1input = $("#player-1").val();
    var player2input = $("#player-2").val();

    $(".player-1-name").text(player1input);
    $(".player-2-name").text(player2input);

    var player1 = new Player(player1input, 0, 0);
    var player2 = new Player(player2input, 0, 0);



// PLAYER ONE ROLL AND STOP BUTTON BELOW


      var player1Rolls = function(){
          $(".roll-1").click(function() {

            var player1Dice = player1.rollDie();

            var dice1Src = getDicePicture(player1Dice[0]);
            var dice2Src = getDicePicture(player1Dice[1]);

            $(".dice1-pics").html(dice1Src + dice2Src);

            if(player1Dice[0] === 1 || player1Dice[1]===1){
              $(".buttons-1").fadeOut("slow");
              $(".buttons-2").fadeIn("slow");
            };


            $(".player-1-roll").text(" " + player1Dice);
            $(".player-1-score").text(" " + player1.turnScore);
            $(".player-1-total-score").text(" " + player1.score);


          });
      };




      var player1Stops = function(){
        $(".stop-1").click(function(){

          player1.stop();
          $(".player-1-total-score").text(" " + player1.score);
          $(".player-1-score").text(" " + player1.turnScore);


          var winner = player1.scoreCheck();

          if(winner === "Win"){
            alert("Congratulations " + player1.playerName +" you win! GAME OVER!")
            player1.newGame();
            player2.newGame();
            $(".player-1-total-score").text(" " + player1.score);
            $(".player-1-score").text(" " + player1.turnScore);
            $(".player-2-total-score").text(" " + player2.score);
            $(".player-2-score").text(" " + player2.turnScore);
            $(".player-1-roll").text(" ");
            $(".player-2-roll").text(" ");

          }else{
            showPlayer2Button();
          }

        });
      };





// PLAYER TWO ROLL AND STOP BUTTON BELOW

      var player2Rolls = function(){
          $(".roll-2").click(function() {

            var player2Dice = player2.rollDie();

            var dice1Src = getDicePicture(player2Dice[0]);
            var dice2Src = getDicePicture(player2Dice[1]);
            $(".dice2-pics").html(dice1Src + dice2Src);

            if(player2Dice[0] === 1 || player2Dice[1] === 1){
              showPlayer1Button();
            };

            $(".player-2-roll").text(" " + player2Dice);
            $(".player-2-score").text(" " + player2.turnScore);
            $(".player-2-total-score").text(" " + player2.score);


          });
      };





      var player2Stops = function(){
        $(".stop-2").click(function(){

          player2.stop();
          $(".player-2-total-score").text(" " + player2.score);
          $(".player-2-score").text(" " + player2.turnScore);


          var winner = player2.scoreCheck();

          if(winner === "Win"){
            alert("Congratulations " + player2.playerName +" you win! GAME OVER!")
            player1.newGame();
            player2.newGame();
            $(".player-1-total-score").text(" " + player1.score);
            $(".player-1-score").text(" " + player1.turnScore);
            $(".player-2-total-score").text(" " + player2.score);
            $(".player-2-score").text(" " + player2.turnScore);
            $(".player-1-roll").text(" ");
            $(".player-2-roll").text(" ");
            $(".buttons-2").fadeOut("slow");
            $(".buttons-1").fadeIn("slow");
          }else{
            showPlayer1Button();
          }

        });
      };

      player1Rolls();
      player1Stops();
      player2Rolls();
      player2Stops();

  });

});
