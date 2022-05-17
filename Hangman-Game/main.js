$(document).ready(function() //prevent any jQuery code from running before the document is finished loading 
{


  let secretWordStuff = // variable
  {
    wordBank :["Kakashi","Asta","Kaachan","Muzan","Ray","Eren","Norman","Thorfinn","Natsu","Happy","Zeno","Goku",
    "Saitama","Yuno","Krillen","Vegeta","Jiraiya","Sukuna","Naruto","Boruto","Hisoka","Tanjiro","Gon","Madara","Mikasa",
    "Kawaki","Deku","Tomura","Bulma", "Ichigo","Senku","Light","Jotaro","Sasuke","Nagato","Emma","Yugi","Levi","Erwin",
    "Zoro","Luffy","Itachi","Gojo","Zenitsu","Itadori","Todoroki","Armin","Inuyasha","Kaguya","Momoshiki"], // array of 50 words

    generateRandomSecretWord : function () // function
    {
      let randomIndexNumber = Math.floor(secretWordStuff.wordBank.length*(Math.random())); // randomize words from array
      secretWord = secretWordStuff.wordBank[randomIndexNumber]; 
      return secretWord; // return the random word
    },
    
    showHiddenLetterList : function() // function
    {
      let hiddenLetterArray = []; // empty array 
      for (let i=0; i<game.secretWord.length; i++) 
      {
        hiddenLetterArray.push('- '); // display lines that shows where the letters will appear 
        $('#hiddenLetterList').append('<span id=letter-'+i+'>'+hiddenLetterArray[i]+'</span>'); // add the words to the lines 
      }
    }
  };


  let game =  // variable
  {
    isOngoing : false, // game is not being played
    startGame : function () // function
    {
      
      game.secretWord = secretWordStuff.generateRandomSecretWord(); // variable for random word
      game.isOngoing = true; // game is on
      secretWordStuff.showHiddenLetterList(); // display lines  
      letterBoard.showLetters(); // letters
      $('#startButton').remove(); // start button removed
      $('#resetButtonContainer').html('<button id="resetButton" class="btn btn-primary btn-lg">Reset Game</button>'); // restart button will appear
      $('#letterBoard').prop('disabled', false); // alphabet letters will not be disabled
    },


    numberOfGuessesRemaining : 6,// equals 6
    numberOfCorrectGuesses: 0, // is 0
    secretWord : secretWordStuff.generateRandomSecretWord(), // function being called 
    
    evaluateGuess : function (theClickedLetter, theSecretWord) // function
    {
      let numberLettersTheGuessDoesNotMatch = 0; // equals 0
      for (let i=0; i<theSecretWord.length; i++) 
      {
        if(theClickedLetter === (theSecretWord[i]).toUpperCase()) // will uppercase the choosen letter if matached
        {
           $('#letter-'+i).html(theSecretWord[i]); // lettes appears
           game.numberOfCorrectGuesses ++; // increments by 1
           if (game.numberOfCorrectGuesses === theSecretWord.length) // if users guess are the same as the word then...
           {
             game.endGame("Congarts, You Win!!!"); // it will display the message 
             scoreBoard.incrementWinScore(); // win score function will run
            }
          }
        else if (theClickedLetter !== (theSecretWord[i]).toUpperCase()) // if letter pick by the user does not match the random word then...
        {
          numberLettersTheGuessDoesNotMatch ++; // it will add to the letters that doesn't match
        }
      }
      if (numberLettersTheGuessDoesNotMatch === theSecretWord.length) //if the guessed letter matches none of the letters in the secret word
      { 
        if (game.numberOfGuessesRemaining >= 1)  //don't continue to decrement # guesses left if you get to 0
        {
          game.numberOfGuessesRemaining --; // numbers of guesses left will go down by 1
          $('#numberOfGuessesRemaining').html(game.numberOfGuessesRemaining); // shows the number of guesses remaining 
          $('#hangman-display').attr('src', 'images/Hangman-'+test.testLevel+'-'+game.numberOfGuessesRemaining+'.png'); // change the image of the hangman when the number of gueusses go down and matches the number for that image
        }
      }
      if (game.numberOfGuessesRemaining === 0) // if you have zero guesses remaining...
      {
        game.endGame('You Lose!!!'); // display losing message
        scoreBoard.incrementLoseScore(); // function runs
      }
     
    },
    
    endGame : function (winOrLossMessage) // function
     {
      game.isOngoing = false; // game not running 
      $('#letterBoard').prop('disabled', true); //nothing happens if you click the win message
      $('#letterBoard').html('<span class="winOrLossMessage" style="padding: 50px;">'+winOrLossMessage+'</span>'); // padding around only the win message, not the letter board
      $('#hiddenLetterList').html(game.secretWord); // the random word shows 
      $('#resetButton').html('Play Again'); // reset button display
    },
    

    resetGame : function () // function
     { 
      
      game.secretWord = secretWordStuff.generateRandomSecretWord(); // function runs
      
      $('#hiddenLetterList').empty();  // the lines will appear and the word that showed will be gone from the lines
      $('#letterBoard').empty(); // the letter that were disabled are enabled again
     
      game.numberOfGuessesRemaining = 6; // equals 6
      
      $('#numberOfGuessesRemaining').html(game.numberOfGuessesRemaining); // display the guesses 
      $('#hangman-display').attr('src', "images/Hangman-number-6.png"); // display the hangman image (the sand)
      game.numberOfCorrectGuesses = 0; // correct guesses will be 0
      game.isOngoing = true; // game runs
      secretWordStuff.showHiddenLetterList(); //show letters
      letterBoard.showLetters(); // show alphabet letters 
      $('#startButton').remove(); // remove start button 
      $('#resetButtonContainer').html('<button id="resetButton" class="btn btn-primary btn-lg">Reset Game</button>'); // reset button will appear
      $('#letterBoard').prop('disabled', false);
      // repeating some of the stateGame function in resetGame 
    }
  };



  let letterBoard = // variable 
  {
    lettersArray : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], // array of the alphabet 
    showLetters : function() // function
    { 
      for (let i=0; i<letterBoard.lettersArray.length; i++) 
      {
        $('#letterBoard').append('<button class="letter">'+letterBoard.lettersArray[i]+'</button>'); // alphabet letter button appears
      }
      $('#letterBoard').prop('disabled', false); // will not be disabled
    },
    disableGuessedLetters : function (theClickedLetter) // function
    {
        theClickedLetter.addClass('disabled'); // when letter is clicked it will be disabled 
        theClickedLetter.prop('disabled', true); // disabled 
    }
  };



  let test = // variable 
  {
    testLevel : 'number', 
    settest : function(theClickedtest) // function 
    {
          theClickedtest.addClass('clicked');   // will be clickable
      }
    }
  


  let scoreBoard = // variable 
  {
    gamesWon : 0, // equals 0
    gamesLost : 0, // equals 0 

    incrementWinScore : function() // function 
    {
      scoreBoard.gamesWon++; // will add one to games won 
      $('#number-of-games-won').html(scoreBoard.gamesWon); // display
    },
    

    incrementLoseScore : function() //function
    {
      scoreBoard.gamesLost++; // will add one to games lost
      $('#number-of-games-lost').html(scoreBoard.gamesLost);
    },
    

    resetScore : function() // function 
    {
      scoreBoard.gamesWon = 0; // will be 0 when reset
      scoreBoard.gamesLost = 0; // will be when reset 
      $('#number-of-games-won').html(scoreBoard.gamesWon); // displays
      $('#number-of-games-lost').html(scoreBoard.gamesLost); // display
    }
  };


  let buttonHandlers = // variable 
  {
    startClickHandler : function(event) // function 
     {
      game.startGame(); // call function
    },
    

    letterClickHandler : function (event) // function 
     {
      event.stopPropagation(); //prevents propagation of the same event from being called.
      let $theClickedLetter = $(event.target); 
      if (game.isOngoing === true && $theClickedLetter.attr('id') !== 'letterBoard') 
      { // nothing happens if user clicks on letterBoard parent div instead of letter button
        game.evaluateGuess($theClickedLetter.html(), game.secretWord);
        letterBoard.disableGuessedLetters($theClickedLetter);
      }
    },
   

    resetClickHandler : function (event) // function 
    {
          game.resetGame();    // call function
    },
   
   resetScoreBoardHandler : function(event) // function 
    {
      scoreBoard.resetScore(); // call function
    },
    
    
  };


  $('#startButton').on('click', buttonHandlers.startClickHandler); // start button clicked = functions run
  $('#letterBoard').on('click', buttonHandlers.letterClickHandler); //  aplhabet letters clicked = functions run 
  $('#resetButtonContainer').on('click', '#resetButton', buttonHandlers.resetClickHandler); // reset button clicked = functions run
  $('#reset-score-board').on('click', buttonHandlers.resetScoreBoardHandler); // reset button clicked = functions run
  

}); 