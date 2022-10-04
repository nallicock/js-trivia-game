const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");
const box4 = document.querySelector("#box4");
let bannerImg = document.querySelector(".banner-img");
let instructionBox = document.querySelector(".question-text-desc");

let gameStart = false;

let htmlQuestionNo = document.querySelector(".question-no");

let i = 0;

let qText = document.querySelector(".question-text");

let boxArr = [box1, box2, box3, box4];
let allBoxes = document.querySelectorAll(".box");
let score = 0;
let questionNo = 0;
htmlQuestionNo = 1;
let gameLost = false;
let restartBtn = document.querySelector(".restartBtn");

let category = ["RAP", "TECH", "VIDEO GAMES", "HISTORY"];
let rapPhotos = [
  "../img/club.jpg",
  "../img/ja-rule.png",
  "../img/eminem.jpg",
  "../img/migos.jpg",
  "../img/lilwayne.jpg",
  "../img/50cent.jpg",
  "../img/mj.jpg",
  "../img/LL-COOL-J.jpg",
  "../img/anime.PNG",
  "../img/uncle-phil.jpg",
];
let selectedCategory = "";

//rap category object
let rapQuestion = {
  q: [
    [`Who created the song "In Da Club?"`], //0
    [`Who absolutely DESTROYED Ja Rule's career?`], //1
    [`What is Eminem's real name?`], //2
    [`What rap group is this?`], //3
    [`Finish the lyrics: "Real Gs move in silence like _____"`], //4
    [`Who is the greatest rapper of all time?`], //5
    [`Did Michael Jackson like listening to rap?`], //6
    [`Finish the lyrics: "Mama said _______"`], //7
    [`What is the most frequently referenced anime in Hip-Hop?`], //8
    [`Who created the song "No Role Modelz"?`], //9
  ],
  a: [
    ["50 Cent", "A$AP ROCKY", "MIGOS", "Eminem"], //0
    ["Tupac", "Big L", "50 Cent", "Lil Wayne"], //1
    ["Harry Osborne", "Liu Kang", "Marshall Mathers", "Barack Obama"], //2
    ["Beastie Boys", "N.W.A", "G-Unit", "Migos"], //3
    ["A ninja", "Lasagna", "Santa", "A cat"], //4
    ["50 Cent", "50 Cent", "50 Cent", "50 Cent"], //5
    ["Doesn't Matter", "Why do you care?", "Yes", "Nope"], //6
    ["I love you", "How are you", "KNOCK YOU OUT!", "SLAP YOU"], //7
    ["One Piece", "Dragon Ball Z", "Naruto", "Bleach"], //8
    ["Drake", "Chris Brown", "J. Cole", "Lil Baby"], //9
  ],
  answerIdx: [0, 2, 2, 3, 1, 1, 2, 2, 1, 2],
};

const qa = {
  question: "",
  answer: [],
};

function restartGame() {
  console.log("restart gane");
  if (questionNo > -1) {
    console.log("restart game if true");
    qText.textContent = "";
    selectedCategory = "";
    document.querySelector("body").style.backgroundColor = "#FF414D";
    for (i = 0; i < boxArr.length; i++) {
      boxArr[i].classList.add("box-invis");
      boxArr[i].textContent = "";
    }

    restartBtn.classList.remove("box-invis");
    restartBtn.addEventListener("click", function () {
      document.location.reload();
      categoryList();
      qa.answer = [];
      qa.question = "";
      gameLost = false;
    });
  }
}

//put the categories on all 4 boxes, addition of restarting the game.
function categoryList() {
  for (i = 0; i < category.length; i++) {
    boxArr[i].classList.remove("box-invis");
    boxArr[i].textContent = category[i];
  }
  box1.addEventListener("click", homeBtn);
  box2.addEventListener("click", homeBtn);
  box3.addEventListener("click", homeBtn);
  box4.addEventListener("click", homeBtn);
}

//find the answer to the question on screen.
function findAnswer(ans) {
  console.log("findanswer function");
  if (gameStart && ans === qa.answer[rapQuestion.answerIdx[questionNo]]) {
    console.log("Correct answer");
    return true;
  } else {
    restartGame();
    console.log("NOOOOOOOOOOOOOOOOOOOOOOOOPE");
    return false;
  }
}

//makes boxes disappear, reappear with the correct question/answer, and generates the question title text.
function boxRefresh() {
  bannerImg.classList.add("box-invis");
  console.log("boxrefresh function");
  qa.question = rapQuestion.q[questionNo];
  qa.answer = rapQuestion.a[questionNo];
  setTimeout(function () {
    console.log("0.5 sec timeout.");
    for (i = 0; i < boxArr.length; i++) {
      boxArr[i].textContent = "";
      if (boxArr[i].textContent !== selectedCategory) {
        boxArr[i].classList.add("box-invis");
        boxArr[i].classList.remove("box");
      }
    }
  }, 0);

  setTimeout(function () {
    for (i = 0; i < boxArr.length; i++) {
      boxArr[i].classList.add("box");
      boxArr[i].classList.remove("box-invis");
    }
    for (i = 0; i < boxArr.length; i++) {
      boxArr[i].textContent = qa.answer[i];
    }
    qText.textContent = qa.question;
  }, 500);

  console.log(
    "The answer will be: " + qa.answer[rapQuestion.answerIdx[questionNo]]
  );
  instructionBox.classList.add("box-invis");
  setTimeout(function () {
    bannerImg.src = rapPhotos[questionNo];
  }, 750);
  setTimeout(function () {
    bannerImg.classList.remove("box-invis");
  }, 800);
}

//Confirm which category was selected and act accordingly.
function homeBtn(e) {
  console.log("homebtn function");
  switch (e.target.textContent) {
    case "RAP":
      console.log("Text is currently: " + e.target.textContent);
      selectedCategory = "RAP";
      console.log("Selected category: " + selectedCategory);
      boxRefresh();
      gameStart = true;
      break;

    case "TECH":
      console.log("Not Yet Available.");
      questionNo++;
      break;
    case "VIDEO GAMES":
      console.log("Not Yet Available.");
      break;
    case "HISTORY":
      console.log("Not Yet Available.");
      break;
  }
}

//PROGRAM START

box1.addEventListener("click", homeBtn);
box2.addEventListener("click", homeBtn);
box3.addEventListener("click", homeBtn);
box4.addEventListener("click", homeBtn);

box1.addEventListener("click", function (e) {
  if (e.target.textContent === "RAP") {
    homeBtn();
  }
  console.log("box1 event listener");
  if (findAnswer(e.target.textContent)) {
    questionNo++;
    console.log(questionNo);
    console.log(true);
    if (questionNo === 9) {
      console.log("Nice");
      document.querySelector("body").style.backgroundColor = "green";
    } else {
      boxRefresh();
    }
  } else {
    console.log("Failed");
  }
});

box2.addEventListener("click", function (e) {
  if (e.target.textContent === "TECH") {
    homeBtn();
  }
  if (findAnswer(e.target.textContent)) {
    questionNo++;
    console.log(questionNo);
    console.log(true);
    boxRefresh();
  } else {
    console.log("Failed");
  }
});

box3.addEventListener("click", function (e) {
  if (e.target.textContent === "VIDEO GAMES") {
    homeBtn();
  }
  if (findAnswer(e.target.textContent)) {
    questionNo++;
    console.log(questionNo);
    console.log(true);
    boxRefresh();
  } else {
    console.log("Failed");
  }
});
box4.addEventListener("click", function (e) {
  if (e.target.textContent === "HISTORY") {
    homeBtn();
  }
  if (findAnswer(e.target.textContent)) {
    questionNo++;
    console.log(questionNo);
    console.log(true);
    boxRefresh();
  } else {
    console.log("Failed");
  }
});
