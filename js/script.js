const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");
const box4 = document.querySelector("#box4");
let boxDiv = document.querySelector(".boxes");
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
let gameLost = false;
let restartBtn = document.querySelector(".restartBtn");

let category = ["RAP", "TECH", "VIDEO GAMES", "HISTORY"];
let rapPhotos = [
  "../img/rap/club.jpg",
  "../img/rap/ja-rule.png",
  "../img/rap/eminem.jpg",
  "../img/rap/migos.jpg",
  "../img/rap/lilwayne.jpg",
  "../img/rap/50cent.jpg",
  "../img/rap/mj.jpg",
  "../img/rap/LL-COOL-J.jpg",
  "../img/rap/anime.PNG",
  "../img/rap/uncle-phil.jpg",
];

let techPhotos = [
  "../img/tech/microsoft.jpg",
  "../img/tech/apple.jpg",
  "../img/tech/ps2.jpg",
  "../img/tech/tesla.png",
  "../img/tech/annoying.jpg",
  "../img/tech/windows.jpg",
  "../img/tech/social-media.jpg",
  "../img/tech/blueprint.jpg",
  "../img/tech/software.jpg",
  "../img/tech/hardware.jpg",
];

let gamePhotos = [
  "../img/games/lol.jpg",
  "../img/games/infinity.jpg",
  "../img/games/redring.jpg",
  "../img/games/game.jpg",
  "../img/games/money.jpg",
  "../img/games/prize.jpg",
  "../img/games/bethesda.jpg",
  "../img/games/pacman.png",
  "../img/games/controller.jpg",
  "../img/games/planet.jpg",
];
let historyPhotos = [
  "../img/history/telephone.jpg",
  "../img/history/war.jpg",
  "../img/history/bridge.jpg",
  "../img/history/abraham.jpg",
  "../img/history/mona lisa.jpg",
  "../img/history/beatles.jpg",
  "../img/history/london.jpg",
  "../img/history/pearl.jpg",
  "../img/history/greenland.jpg",
  "../img/history/fire.jpg",
];
let selectedCategory = "";

//RAP questions and answers
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
  answerIdx: [0, 2, 2, 3, 1, 1, 2, 2, 1, 2], // if i was to do this again, i'd put strings instead of the index and confirm if the textContent === the string in this array
};

//TECH questions and answers
let techQuestion = {
  q: [
    [`Who created the company Microsoft?`], //0
    [`Who was the creator of Apple?`], //1
    [`Which company created the Playstation 2?`], //2
    [`Which billion dollar company today is big on Electric Cars?`], //3
    [`Which of the following is the most annoying?`], //4
    [`What is the best way to force close an application/process?(Windows)`], //5
    [`What is the most popular social media platform in 2022?`], //6
    [
      `In Object Oriented Programming, what is the equivalent of a "Blueprint"?`,
    ], //7
    [`Which of the following is Software?`], //8
    [`Which of the following is Hardware?`], //9
  ],
  a: [
    ["Michael Jackson", "A$AP ROCKY", "Bill Gates", "Mark Walberg"], //0
    ["Jennifer Lopez", "Joe Biden", "Brad Pitt", "Steve Jobs"], //1
    ["Sony", "Atari", "Microsoft", "Bell"], //2
    ["Toyota", "Honda", "Wikipedia", "Tesla"], //3
    ["Windows Updates", "My girlfriend's dog", "Flies", "Public Transit"], //4
    ["Punch Screen", "Restart PC", "Red X", "Task Manager"], //5
    ["Instagram", "Facebook", "Twitter", "TikTok"], //6
    ["Inheritance", "Polymorphism", "Arrays", "Classes"], //7
    ["Keyboard", "Motherboard", "Google Chrome", "Webcam"], //8
    ["Pinball", "Minesweeper", "Spotify", "Mouse"], //9
  ],
  answerIdx: [2, 3, 0, 3, 0, 3, 3, 3, 2, 3],
};

//VIDEO GAMES questions and answers
let gameQuestion = {
  q: [
    [`What is the name of the company who created League of Legends?`], //0
    [`Which game franchise was a massive hit, created by Infinity Ward?`], //1
    [
      `For the XBOX 360, was was the name of the red lights indicating a dead console?`,
    ], //2
    [`What is the name of the first video game ever created?`], //3 -- pong
    [`What game had the highest grand prize in an esports event($30,000,000)?`], //4 -- dota
    [`What is the most played video game of all time?`], //5 -- fortnite
    [`Bethesda studios is best known for what game series?`], //6 -- the elder scrolls
    [`What food was the character Pac Man modeled after?`], //7 -- pizza
    [`Which console is this controller for?`], //8 -- xbox
    [`What planet is scalable to the size of the Minecraft world?`], //9 -- Neptune
  ],
  a: [
    ["Riot Games", "Activision", "Nintendo", "Sony"], //0
    ["Battlefield", "Borderlands", "Call of Duty", "VALORANT"], //1
    ["No Power", "Red Ring of Death", "Red Light", "Sirens"], //2
    ["Pac Man", "Super Mario", "Pong", "Legend of Zelda"], //3
    ["DOTA", "League of Legends", "Fortnite", "Star Wars: TIE Fighter"], //4
    ["League of Legends", "Call of Duty: Warzone", "Roblox", "Fortnite"], //5
    ["Heroes of the Storm", "The Elder Scrolls", "Donkey Kong", "Roblox"], //6
    ["Apple", "Pie", "Pizza", "Burger"], //7
    ["Atari", "Nintendo 64", "PS5", "XBOX"], //8
    ["Neptune", "Moon", "Earth", "Mars"], //9
  ],
  answerIdx: [0, 2, 1, 2, 0, 3, 1, 2, 3, 0],
};

//HISTORY questions and answers
let historyQuestion = {
  q: [
    [`Who created the telephone?`], //0 -- Alexander Graham Bell
    [`How many years did the 100 year war last?`], //1 -- 116 years
    [
      `Which bridge was the first to be built across the River Thames in London?`,
    ], //2 -- London Bridge
    [`Who assassinated Abraham Lincoln?`], //3 -- John Wilkes Booth
    [`How many times was the Mona Lisa stolen?`], //4 -- Once
    [`What is the name of the Beatles' debut album?`], //5 -- Please Please Me
    [`The great fire of London happened in which year?`], //6 -- 1666
    [`When was Pearl Harbor bombed?`], //7 -- December 7th 1941
    [`What group of people discovered Greenland?`], //8 -- The Vikings
    [`Which human ancestor was the first to discover fire?`], //9 -- Homo Erectus
  ],
  a: [
    [
      "Michael Jackson",
      "Alexander Graham Bell",
      "John Wilkes Booth",
      "Charlie Chaplin",
    ], //0
    ["100 years, of course", "80 years", "90 years", "116 years"], //1
    [
      "British Bridge",
      "United Kingdom Road",
      "London Bridge",
      "Queen Elizabeth",
    ], //2
    ["Barack Obama", "Ezio Auditore", "Joseph Stalin", "John Wilkes Booth"], //3
    ["What? It was stolen?", "Once", "Three times", "0 times"], //4
    ["Please Please Me", "Marshall Mathers LP", "Luv is Rage", "The Carter"], //5
    ["1869", "1950", "1666", "1785"], //6
    [
      "February 14 1677",
      "January 2 1921",
      "September 20 1915",
      "December 7 1941",
    ], //7
    ["The Shaolin Monks", "The Nuns", "Napolean's Crew", "The Vikings"], //8
    ["Homo Habilis", "Homo Rudolfensis", "Homo Erectus", "Homo Sapien"], //9
  ],
  answerIdx: [1, 3, 2, 3, 1, 0, 2, 3, 3, 2],
};

//object to store the questions and answers...
const qa = {
  question: "",
  answer: [],
};

//when user clicks an incorrect answer, call this function to end and prompt user to
//restart game
function restartGame() {
  console.log("restart gane");
  if (questionNo > -1) {
    boxDiv.classList.add("box-invis");
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

//when user wins the game, call this function
function gameWon() {
  switch (selectedCategory) {
    case "RAP":
      bannerImg.src = "./img/tupac.jpg";
      break;
    case "TECH":
      bannerImg.src = "./img/technology.jpg";
      break;

    case "VIDEO GAMES":
      bannerImg.src = "./img/gaming.jpg";
      break;

    case "HISTORY":
      bannerImg.src = "./img/history.jpg";
      break;
  }
  restartBtn.classList.remove("box-invis");
  restartBtn.style.backgroundColor = "#023020";
  boxDiv.style.backgroundColor = "green";
  boxDiv.style.border = "green";
  document.querySelector("body").style.backgroundColor = " green";
  qText.textContent =
    "Congratulations! You beat the " + selectedCategory + " category!";
  for (i = 0; i < boxArr.length; i++) {
    boxArr[i].textContent = "";
    boxArr[i].classList.add("box-invis");
  }
  restartBtn.addEventListener("click", function () {
    document.location.reload();
  });
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
  switch (selectedCategory) {
    case "RAP":
      if (gameStart && ans === qa.answer[rapQuestion.answerIdx[questionNo]]) {
        console.log("Correct answer");
        return true;
      } else {
        restartGame();
        return false;
      }
      break;
    case "TECH":
      if (gameStart && ans === qa.answer[techQuestion.answerIdx[questionNo]]) {
        console.log("Correct answer");
        return true;
      } else {
        restartGame();
        return false;
      }
      break;
    case "VIDEO GAMES":
      if (gameStart && ans === qa.answer[gameQuestion.answerIdx[questionNo]]) {
        console.log("Correct answer");
        return true;
      } else {
        restartGame();
        return false;
      }
      break;
    case "HISTORY":
      if (
        gameStart &&
        ans === qa.answer[historyQuestion.answerIdx[questionNo]]
      ) {
        console.log("Correct answer");
        return true;
      } else {
        restartGame();
        return false;
      }
      break;
  }
}

//makes boxes disappear, reappear with the correct question/answer, and generates the question title text.
function boxRefresh() {
  if (questionNo !== 10) {
    switch (selectedCategory) {
      case "RAP":
        qa.question = rapQuestion.q[questionNo];
        qa.answer = rapQuestion.a[questionNo];
        break;
      case "TECH":
        qa.question = techQuestion.q[questionNo];
        qa.answer = techQuestion.a[questionNo];
        break;
      case "VIDEO GAMES":
        qa.question = gameQuestion.q[questionNo];
        qa.answer = gameQuestion.a[questionNo];
        break;
      case "HISTORY":
        qa.question = historyQuestion.q[questionNo];
        qa.answer = historyQuestion.a[questionNo];
        break;
      default:
        console.log("This isn't even possible LOL... unless...");
    }
    bannerImg.classList.add("box-invis");
    console.log("boxrefresh function");
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

    instructionBox.classList.add("box-invis");
    setTimeout(function () {
      switch (selectedCategory) {
        case "RAP":
          bannerImg.src = rapPhotos[questionNo];
          break;
        case "TECH":
          bannerImg.src = techPhotos[questionNo];
          break;
        case "VIDEO GAMES":
          bannerImg.src = gamePhotos[questionNo];
          break;
        case "HISTORY":
          bannerImg.src = historyPhotos[questionNo];
          break;
        default:
          console.log("????");
          break;
      }
    }, 750);
    setTimeout(function () {
      bannerImg.classList.remove("box-invis");
    }, 800);
  } else {
    gameWon();
  }
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
      selectedCategory = "TECH";
      boxRefresh();
      gameStart = true;
      break;
    case "VIDEO GAMES":
      selectedCategory = "VIDEO GAMES";
      boxRefresh();
      gameStart = true;
      break;
    case "HISTORY":
      selectedCategory = "HISTORY";
      boxRefresh();
      gameStart = true;
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
