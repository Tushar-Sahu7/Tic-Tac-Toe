let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let startbtn = document.querySelector(".start");
let playerSignText = document.querySelector("#player-sign");
let player1 = document.querySelector("#player1");
let player2 = document.querySelector("#player2");


let winningPatterns = [
  [0, 1, 2], //left to right
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], //top to down
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], //diagonals
  [2, 4, 6],
];

let player1Sign, player2Sign;
let moves = 0;

//give either 0 or 1
let turn = Math.round(Math.random());

//handles the sign for player
const handlePlayerSign = () => {
  if (turn) {
    player1Sign = "O";
    player2Sign = "X";
  } else {
    player1Sign = "X";
    player2Sign = "O";
  }
};

let p1, p2;

//click to start the game
startbtn.addEventListener("click", () => {
  customCursor();
  p1 = player1.value || "Ronaldo";
  p2 = player2.value || "Messi";
  handlePlayerSign();
  playerSignText.innerText = `Player 1: ${p1} is ${player1Sign} & Player 2: ${p2} is ${player2Sign}`;
  playerSignText.classList.remove("hide");
  startbtn.classList.add("hide");

  //add x or o in the box
  boxes.forEach((box) => {
    box.addEventListener("click", handleBoxClick);
  });
});

//adds custom cusor emoji according to the turn
const customCursor = () =>{
  const symbol = turn? "⭕" : "✖️";
  document.querySelectorAll(".box").forEach((box) =>{
    box.style.cursor = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><text y="24" font-size="24">${symbol}</text></svg>'), auto`;
  });
}

//correctly write the sign & disable button
//"O" == 1 & "X" == 0
const handleBoxClick = (e) => {
  const box = e.target;
  box.innerText = turn ? "O" : "X";
  box.style.color = turn? "coral" : "cornflowerblue"
  turn = !turn;
  customCursor();
  box.disabled = true;
  moves++;
  if(moves > 2){
    checkWinner();
  }
}

//checks the winner by matching winning patterns from boxes
const checkWinner = () => {
  let winnerFound = false;
  for (let pattern of winningPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        winnerFound = true;
        showWinner(pos1Val == player1Sign ? p1 : p2);
        disableAllButtons();
        setTimeout(() => {
          
          restart();
        }, 3500);
      }
    }
  }
  if (!winnerFound && moves === 9) {
    playerSignText.innerText = "It's a Draw!";
    setTimeout(() => {
      restart();
    }, 2000);
  }
};

//shows the winner
const showWinner = (winner) => {
  playerSignText.innerText = `Congratulations, The Winner is ${winner}`;
   const duration = 500;      // 1/2 seconds
      const end = Date.now() + duration;

      (function frame() {
        // small bursts from random X along top edge
        confetti({
          particleCount: 10,
          startVelocity: 40,
          spread: 100,
          origin: { x: Math.random(), y: 0 },
          gravity: 1.2
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
};

//disable all the buttons
const disableAllButtons = () => {boxes.forEach((box) =>{
  box.disabled = true;
})}

//restart the game
const restart = () => {
  turn = Math.round(Math.random());
  handlePlayerSign();
  moves = 0;
  startbtn.classList.remove("hide");
  playerSignText.classList.add("hide");
  window.scrollTo(0,0);
  boxes.forEach((box) => {
    box.style.cursor = "default";
    box.disabled = false;
    box.innerText = "";
    box.removeEventListener("click", handleBoxClick);
  });
};

//reset all button and remove the text
resetbtn.addEventListener("click", () => {
  restart();
});
