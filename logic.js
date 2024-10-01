let answer = '';
let answerState = '';
let mistakesCount = 0;
let lettersState;

startGame();

function startGame() {
  mistakesCount = 0;
  lettersState = getDefaultKeyboard();
  drawPerson(mistakesCount);
  drawBoard(lettersState);
  answer = generateWord();
  let starArray = [];
  for (let i = 0; i < answer.length; i++) {
    starArray.push('*');
  }
  answerState = starArray.join('');

  drawAnswerState(answerState);
}

function generateWord() {
  return dictionary[Math.trunc(Math.random() * dictionary.length)];
}

function onKeyClick(letter) {
  if (mistakesCount === 7) {
    alert(`Конец игры. Неотгаданное слово - ${answer}`);
    startGame();
    return;
  }

  let letterFromState; 
  for (let i = 0; i < lettersState.length; i++){
    if (letter === lettersState[i].char){
       letterFromState = lettersState[i];
       break;
    }
  }

  if (!answer.includes(letter) && !letterFromState.error){
    mistakesCount++;
    letterFromState.error = true;
  }

  if (answer.includes(letter) && !letterFromState.success) {
    letterFromState.success = true;
    let tempArray = [];
    for (let i = 0; i < answer.length; i++) {
      tempArray.push(answer[i] === letter ? letter : answerState[i]);
    }
    answerState = tempArray.join('');
  }


  drawPerson(mistakesCount);
  drawBoard(lettersState);
  drawAnswerState(answerState);

  if (answer === answerState){
    winGame();
  }

}

