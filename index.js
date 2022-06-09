function forever_game_loop() {
  main_menu();
    // forever_game_loop();   maybe try later again
  }
  
  function main_menu() {
    $(document).keydown(function() {
      $(document).off();
      main_game();
    })
  }
  
  function generate_random_btn() {
    var random_btn_index = Math.floor(Math.random() * 4);
    var random_btn_id = $(".btn")[random_btn_index].id;
    return random_btn_id
  }
  
  function make_sound(button_id) {
    switch (button_id) {
  
      case "red":
        var red_audio = new Audio('sounds/red.mp3');
        red_audio.play();
        break;
  
      case "green":
        var green_audio = new Audio('sounds/green.mp3');
        green_audio.play();
        break;
  
      case "blue":
        var blue_audio = new Audio('sounds/blue.mp3');
        blue_audio.play();
        break;
  
      case "yellow":
        var yellow_audio = new Audio('sounds/yellow.mp3');
        yellow_audio.play();
        break;
  
      default: console.log(button_id);
    }
  }
  
  function main_game() {
  
  // -----------------INITIALS-----------------------------------
    var list_generation = [];
    var list_guessing = [];
    random_btn_id = generate_random_btn();
    list_generation.push(random_btn_id);
    make_sound(random_btn_id);
  
    new_button = $("div#" + random_btn_id);
    new_button.addClass("pressed");
    setTimeout(function() {
      new_button.removeClass("pressed");
    }, 100)
  
    function repeat() {
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 100);
    }
  
  
  
    $('h1').text("Level: " + list_generation.length);
  
  
  // ----------------------EVENT LISTENERS----------------------------
    $(".btn").click(function() {
      clicked_btn_id = this.id;
      next_index = list_guessing.length;
  
  
      //-------- Game over case------------
      if (clicked_btn_id !== list_generation[next_index]) {
          $(".btn").off();
  
        // -------------Red animation--------------
          $("body").addClass("game-over");
          setTimeout(function() {
            $("body").removeClass("game-over");
          }, 100);
  
        // ----------- Other resets----------------
          $('h1').text("Game Over, Press Any Key to Restart!");
          var wrong_audio = new Audio('sounds/wrong.mp3');
          wrong_audio.play();
          main_menu();
      }
  
      //---------Not Game Over -------------
      else {
        list_guessing.push(clicked_btn_id);
        clicked_btn = $("div#" + clicked_btn_id)
  
        //---------Continue playing (animation/sound) -------------
        if (list_generation.length !== list_guessing.length) {
          make_sound(clicked_btn_id);
          clicked_btn.addClass("pressed");
          setTimeout(function() {
            clicked_btn.removeClass("pressed");
          }, 100)
        }
  
        //-------------WIN-----------------
        else {
          random_btn_id = generate_random_btn();
          list_generation.push(random_btn_id);
          $('h1').text("Level: " + list_generation.length);
          list_guessing = [];
          new_button = $("div#" + random_btn_id);
          make_sound(clicked_btn_id);
          clicked_btn.addClass("pressed");
          setTimeout(function() {
            clicked_btn.removeClass("pressed");
          }, 100)
          
  
          setTimeout(function () {
            make_sound(random_btn_id);
            new_button.addClass("pressed");
            setTimeout(function() {
              new_button.removeClass("pressed");
            }, 100)
          }, 1000)
        }
      }
    })
  }
  
  
  forever_game_loop()
  