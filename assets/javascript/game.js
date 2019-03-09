$(document).ready(function() {
    //array to contain the words to guess
    var words = ["prince","queen","cyndi lauper","toto","blondie","madonna","the bangles","guns-n-roses","wham","michael jackson","men at work"];
    //array to contain the name of the song and the ban to show it when the user win
    var songTitle=[
      "CALL ME - BLONDIE",
      "WHEN DOVES CRY - PRINCE",
      "SWEET CHILD O MINE - GUNS-N-ROSES",
      "ANOTHER ONE BITES THE DUST - QUEEN",
      "AFRICA - TOTO",
      "WALK LIKE AN EGYPTIAN - THE BANGLES",
      "DOWN UNDER - MEN AT WORK",
      "WAKE ME UP BEFORE YOU GO GO - WHAM",
      "BAD - MICHAEL JACKSON",
      "TRUE COLORS - CYNDI LAUPER",
      "LIKE A VIRGIN - MADONNA"];
    //array to hold keys that pressed to prevent taken them more than once
    var keysAlreadyPressed = "";
    //vaiable to count if we get all letter guessed correctly to do winning actions 
    var correctLetters=[];
    //counter how many words got guessed correctly
    var winer=0;
    //the guesses left variable 
    guess_left=16;
    //audio variable to hold the song
    var audio;
    //getting the word from a random postion from the array
     var chosenWord = words[Math.floor(Math.random() * 5)];
    //fill the tags with the approperiate text
    /*
        -current_word_label this tag will hold the label that shows the users the correct letters he guessed
         for the current word.
        -wins_counter: this label to show the custmers how many times he guessed the right word.
        -guessed_letter_label: this label will refer to a hidden tag of the letters that already pressed by the user.
        -guesses_left_lbl:label to refer to the hidden tag that holds the number of tries left.
    */
  
    $("#current_word_label").text("Current Word");
    $("#guessed_letter_label").text("Letters already guessed");
    $("#guesses_left_lbl").text("Guesses left");
    $("#guesses_left_content").text(guess_left);
    //function to fill the current word h2 tag with '-' to hide the correct letters
    function fillWithArg(chosenWord){
        //loop to the length of the word to generate spans
        for( i=0;i<chosenWord.length;i++){
            //generate span with an id that holds the index of the letters in the word 
            //so we can use it when we try to change a specific span
            $("#current_word_content").append("<span id=\""+i+"\">"+"- "+"</span>");
        }
    }
    //a function that will search the letter in every index in the word and put it in the appropriate span
    function searchReplaceAllIndexes(chosenWord,letter){
        //a loop to go throw all the letters in the word
        for( i=0;i<chosenWord.length;i++){
            //checking if the letter is found in the word
            if(chosenWord.charAt(i) == letter){
                //push the guessed letter to the correct letters that will be used to stop the game
                correctLetters[i] = chosenWord.charAt(i);
                //assign the letter to the appropriate span wich generated 
                //and assigned an id holding the positions of the letters in the word
                $("#"+i).text(letter);
            }
        }
    }
     //calling the fill function to fill the tag with '-'
     fillWithArg(chosenWord);
     //reset function get called when you win or lose to reset all the variables and the html contents
     function reset(){
        //reset all variables to the initial state
        win = 0;
        guess_left=16;
        keyspress =0;
        correctLetters.length = 0;
        keysAlreadyPressed.length=0;
        chosenWord = words[Math.floor(Math.random() * 5)];
        $("#current_word_content").empty();
        $("#guesses_left_content").text(guess_left);
        $("#guessed_letter_content").empty();
        //filling the spans with '-' after each turn
        fillWithArg(chosenWord);
     }
    //  a function to find the song that the user guessed correctly from the path provided
     function putTheSong(chosenWord){
        if(typeof(audio)!="undefined"){
                audio.stop();
        }
        playAudio("./assets/sounds/"+chosenWord+".mp3");
    }
    //a function to be called to play the song that the user guessed
    function playAudio(song){
    //instanitiate an Audio object to hold the song
    audio = new Audio(song);
    //call play function to play the song
    audio.play();
    }
    //a prototype stop function to stop the song
    Audio.prototype.stop = function(){
        this.pause();
        this.currentTime = 0.0;
    }
    //a function to be called to put the image of the song that won
    function putTheImage(chosenWord){
        $("#songimage").attr("src","./assets/images/"+chosenWord+".jpg");
    }
    //the key press event process
    $(document).keyup(function (event) {
        //check if the key is already pressed before and there is still guesses left
        if(keysAlreadyPressed.includes(event.key) == false && guess_left != 0){
            //put the key the keyAlreadyPressed array to avoid pressing it again
            keysAlreadyPressed[16-guess_left]=event.key;
            //display how many guesses left in the approperiate tag
            $("#guesses_left_content").text(--guess_left);
            //display the key presses in the approperiate tag
            $("#guessed_letter_content").append(event.key + ",");
            //now if the word contain the key pressed
            if(chosenWord.includes(event.key)){
                //go to a function that will search the key in all the position 
                //and display it in the approperiat position for the user
                searchReplaceAllIndexes(chosenWord,event.key);
                //if the keypress counter reached the word length then the user won
                if(correctLetters.toString().replace(/,/g,'') == chosenWord){
                    //showing how many times user guessed the correct word
                    $("#win_count").text("Wins: " + (++winner)); 
                    //display the name of the song and the singer name on top of our game countainer
                     $("#songtitle").text(songTitle[words.indexOf(chosenWord)]);
                    //calling the function that will find the winning word as a song to play it
                    putTheSong(chosenWord.replace(/\s/g, ''));
                    //calling the function that will palce the image of the singer
                    putTheImage(chosenWord.replace(/\s/g, ''));
                    //reset to start another turn
                    reset(); 
                }
            }
            //if there is no guesses left 
        }else if(guess_left == 0){
            //will alert the user that he lost
            alert("you lost");
            //and reset everything to start another turn
            reset();
        }
    });
  });
  
  // Creating a giant wordGuessGame object that will house all of our logic and variables.
  var wordGuessGame = {
  
      // Object of all words that can be chosen, along with info such as their picture and a song clip.
      wordsToPick: {
        queen: {
          picture: "queen.jpg",
          song: "Another One Bites the Dust",
          preview: "https://www.youtube.com/watch?v=rY0WxgSXdEE"
        },
        men_at_work: {
          picture: "men_at_work.jpg",
          song: "Down Under",
          preview: "https://www.youtube.com/watch?v=XfR9iY5y94s"
        },
        toto: {
          picture: "toto.jpg",
          song: "Africa",
          preview: "https://www.youtube.com/watch?v=FTQbiNvZqaY"
        },
        michael_jackson: {
          picture: "michael_jackson.jpg",
          song: "Bad",
          preview: "https://www.youtube.com/watch?v=dsUXAEzaC3Q"
        },
        wham: {
          picture: "wham.jpg",
          song: "Wake me up before you go go",
          preview: "https://www.youtube.com/watch?v=pIgZ7gMze7A"
        },
        prince: {
          picture: "prince.jpg",
          song: "When Doves Cry",
          preview: "https://www.youtube.com/watch?v=UG3VcCAlUgE"
        },
        madonna: {
          picture: "madonna.jpg",
          song: "Like a virgin",
          preview: "https://www.youtube.com/watch?v=s__rX_WL100"
        },
        cyndi_lauper: {
          picture: "cyndi_lauper.jpg",
          song: "True Colors",
          preview: "https://www.youtube.com/watch?v=LPn0KFlbqX8"
        },
        the_bangles: {
          picture: "the_bangles.jpg",
          song: "Walk Like An Egyptian",
          preview: "https://www.youtube.com/watch?v=Cv6tuzHUuuk"
        },
        guns_n_roses: {
          picture: "guns_n_roses.jpg",
          song: "Sweet Child o' Mine",
          preview: "https://www.youtube.com/watch?v=1w7OgIMMRc4"
        },
        blondie: {
          picture: "blondie.jpg",
          song: "Call Me",
          preview: "https://www.youtube.com/watch?v=StKVS0eI85I"
        }
      },
    
      // Variables that set the initial state of our wordGuess game.
      wordInPlay: null,
      lettersOfTheWord: [],
      matchedLetters: [],
      guessedLetters: [],
      guessesLeft: 0,
      totalGuesses: 0,
      letterGuessed: null,
      wins: 0,
    
      // The setupGame method is called when the page first loads.
      setupGame: function() {
        // Here we pick a random word.
        var objKeys = Object.keys(this.wordsToPick);
        this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
    
        // Split the chosen word up into its individual letters.
        this.lettersOfTheWord = this.wordInPlay.split("");
        // Builds the representation of the word we are trying to guess and displays it on the page.
        // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
        this.rebuildWordView();
        // This function sets the number of guesses the user gets, and renders it to the HTML.
        this.processUpdateTotalGuesses();
      },
    
      // This function is run whenever the user guesses a letter..
      updatePage: function(letter) {
        // If the user has no guesses left, restart the game.
        if (this.guessesLeft === 0) {
          this.restartGame();
        }
        // Otherwise...
        else {
          // Check for and handle incorrect guesses.
          this.updateGuesses(letter);
    
          // Check for and handle correct guesses.
          this.updateMatchedLetters(letter);
    
          // Rebuild the view of the word. Guessed letters are revealed, non-guessed letters have a "_".
          this.rebuildWordView();
    
          // If the user wins, restart the game.
          if (this.updateWins() === true) {
            this.restartGame();
          }
        }
    
      },
    
      // This function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
      updateGuesses: function(letter) {
        // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
        if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
    
          // Add the letter to the guessedLetters array.
          this.guessedLetters.push(letter);
    
          // Decrease guesses by one.
          this.guessesLeft--;
    
          // Update guesses remaining and guesses letters on the page.
          document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
          document.querySelector("#guessed-letters").innerHTML =
          this.guessedLetters.join(", ");
        }
      },
    
      // This function sets the initial guesses the user gets.
      processUpdateTotalGuesses: function() {
        // The user will get more guesses the longer the word is.
        this.totalGuesses = this.lettersOfTheWord.length + 5;
        this.guessesLeft = this.totalGuesses;
    
        // Render the guesses left to the page.
        document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      },
    
      // This function governs what happens if the user makes a successful guess.
      updateMatchedLetters: function(letter) {
        // Loop through the letters of the "solution".
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
          // If the guessed letter is in the solution, and we haven't guessed it already..
          if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
            // Push the newly guessed letter into the matchedLetters array.
            this.matchedLetters.push(letter);
          }
        }
      },
    
      // This function builds the display of the word that is currently being guessed.
      // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
      rebuildWordView: function() {
        // We start with an empty string.
        var wordView = "";
    
        // Loop through the letters of the word we are trying to guess..
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
          // If the current letter has been guessed, display that letter.
          if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
            wordView += this.lettersOfTheWord[i];
          }
          // If it hasn't been guessed, display a "_" instead.
          else {
            wordView += "&nbsp;_&nbsp;";
          }
        }
    
        // Update the page with the new string we built.
        document.querySelector("#current-word").innerHTML = wordView;
      },
    
      // Function that "restarts" the game by resetting all of the variables.
      restartGame: function() {
        document.querySelector("#guessed-letters").innerHTML = "";
        this.wordInPlay = null;
        this.lettersOfTheWord = [];
        this.matchedLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.letterGuessed = null;
        this.setupGame();
        this.rebuildWordView();
      },
    
      // Function that checks to see if the user has won.
      updateWins: function() {
        var win;
    
        // this won't work for words with double or triple letters
        // var lettersOfTheWordClone = this.lettersOfTheWord.slice(); //clones the array
        // this.matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')
    
        // If you haven't correctly guessed a letter in the word yet, we set win to false.
        if (this.matchedLetters.length === 0) {
          win = false;
        }
        // Otherwise, we set win to true.
        else {
          win = true;
        }
    
        // If a letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false.
        // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
          if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
            win = false;
          }
        }
    
        // If win is true...
        if (win) {
    
          // Increment wins.
          this.wins = this.wins + 1;
    
          // Update wins on the page.
          document.querySelector("#wins").innerHTML = this.wins;
    
          // Update the song title and band on the page.
          document.querySelector("#music").innerHTML = this.wordsToPick[this.wordInPlay].song +
          " By " + this.wordInPlay;
    
          // Update the image of the band on the page.
          document.querySelector("#bandDiv").innerHTML =
            "<img class='band-image' src='../images/" +
            this.wordsToPick[this.wordInPlay].picture + "' alt='" +
            this.wordsToPick[this.wordInPlay].song + "'>";
    
          // Play an audio track of the band.
          var audio = new Audio(this.wordsToPick[this.wordInPlay].preview);
          audio.play();
    
          // return true, which will trigger the restart of our game in the updatePage function.
          return true;
        }
        // If win is false, return false to the updatePage function. The game goes on!
        return false;
      }
    };
    
    // Initialize the game when the page loads.
    wordGuessGame.setupGame();
    
    // When a key is pressed..
    document.onkeyup = function(event) {
      // Capture pressed key and make it lowercase.
      wordGuessGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
      // Pass the guessed letter into our updatePage function to run the game logic.
      wordGuessGame.updatePage(wordGuessGame.letterGuessed);
    };
  
  