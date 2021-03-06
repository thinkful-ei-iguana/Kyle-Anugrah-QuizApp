/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable quotes */
'use strict';


//start the quiz by clicking the start quiz button
function startQuiz(){
  $("#start").on('click', function(event){
    console.log(`startQuiz runs!!`);
    loadsQuestions();
  });
}
//function that updates the question number and the score
function updatesQuestionAndScore(){
  console.log("updatesQuestionAndScore runs!!");
  const html = $(`<ul>
  <li id="js-answered">Questions Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}</li>
      <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`);
  $(".question-and-score").html(html);
}
//function that loads in the answer options
function answerOptions(){
  console.log("answerOptions runs!!");
  let question = STORE.questions[STORE.currentQuestion];
  for(let i =0; i < question.options.length; i++){
    $('.js-options').append(
      `<input type ="radio" name ="options"
      id = "options${i+1}" value ="${question.options[i]}"
      tabindex ="${i + 1}">
          <label for ="option${i+1}"> ${question.options[i]}
          </label> <br/>
          <span id ="js-r${i+1}"></span>
          `);
  }
}
//function to load the questions and adds Html
function loadsQuestions(){
  console.log("loadsQuestions works!!");
  let question = STORE.questions[STORE.currentQuestion];
  updatesQuestionAndScore();
  const questionHtml = $(
    `<div>
        <form id ="teddy-questions" class = "question-form">
        
     <fieldset>
        <div class="line question">
         <div class ="context"> 
         <legend>${question.question}</legend>
         </div>
        </div>

        <div class ="line options">
         <div class ="context">
          <div class ="js-options">       
          </div>
         </div>
        </div>

        <div class ="line">
          <div class ="context">
          <button type = "submit" id ="answer"
          tabindex="4">Submit>></button>
          <button type ="button" id="next-question"
          tabindex ="5">Continue>></button>
          </div>
        </div>
     </fieldset>
         </form>
    </div>`);
  $("main").html(questionHtml);
  answerOptions();
  $("#next-question").hide();


}
//this function checks if the questions are at the end of the list
function endList(){
  console.log("endList works");
  $('body').on('click','#next-question', (event) => {
    STORE.currentQuestion === STORE.questions.length?
      quizResults() : loadsQuestions();
  });
}
//function that shows the result of the quiz
function quizResults(){
    console.log("quizResults works!!");
    let testResult = $(`
  <div class ="results">
     <form id ="js-restart-quiz">
        <fieldset>
          <div class="line">
            <div class ="context">
              <legend>Good Job! This is how well you know Teddy:
              ${STORE.score}/${STORE.questions.length}</legend>
             </div>
          </div>
            <img src ="https://www.davishighnews.com/wp-content/uploads/2018/11/teddy-roosevelt.jpg"
            alt="waving Teddy" class="waving-teddy">
          <div class ="line">
           <div class ="context">
            <button type ="button" id ="restart">
             Restart the quiz </button>
           </div>  
           </div>
        </fieldset>
        </form>
    </div>`);
    $("main").html(testResult);
   // answerOptions();
    $("#next-question").hide();
      
  }
//function that checks if the answer is right or wrong
function checkAnswer(){
  console.log("checkAnswers works!!");
  $('body').on("submit", '#teddy-questions', function
  (event) {
      event.preventDefault();
      let currentQues = STORE.questions
      [STORE.currentQuestion];
      let selectedOption = $("input[name=options]:checked").val();
      if(!selectedOption){
          alert("Teddy doesn't take no for an answer!!");
          return;
      }
      let idNum = currentQues.options.findIndex(i => i === selectedOption);
      let id = "#js-r" + ++idNum;
      $('span').removeClass("right-answer wrong-answer");
      if(selectedOption === currentQues.answer){
          STORE.score++;
          $(`${id}`).append(`You made Teddy proud!</br><img src = 
          "https://thumbs-prod.si-cdn.com/lr3fzhaZgdgJwhEML7Dt0sQeIvU=/420x240/https://public-media.si-cdn.com/filer/57/9c/579c64d1-cc6e-40c0-afaa-7bae324e8ac2/theodore-roosevelt-laughing.jpg" alt = 
          "Teddy's happy face" class="teddy-pic"></br>`);
          $(`${id}`).addClass("right-answer");
      }
      else{
          $(`${id}`).append(`You made Ted mad!</br>
          <img src = "https://bigmemes.funnyjunk.com/pictures/Theodore_6f2d03_1721388.jpg"
          alt ="Mad Teddy" class ="teddy-pic"></br>
          The correct answer is ${currentQues.answer}</br>`);
          $(`${id}`).addClass("wrong-answer");
      }
      STORE.currentQuestion++;
      $("#js-score").text(`Score: ${STORE.score}/
      ${STORE.questions.length}`);
      $('#answer').hide();
      $("input[type=radio]").attr('disabled', true);
    $('#next-question').show();

  });
  
}
function restartQuiz(){
    $('body').on('click','#restart', (event) => {
        STORE.currentQuestion = 0;
        STORE.score = 0;
        loadsQuestions();

    });
}

//this function handles and loads all the functions for the quiz
function handleQuiz(){
  startQuiz();
  endList();
  checkAnswer();
  restartQuiz();
}
$(handleQuiz);
