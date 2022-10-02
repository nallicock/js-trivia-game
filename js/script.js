let box1 = document.querySelector("#box1");
let box2 = document.querySelector("#box2");
let box3 = document.querySelector("#box3");
let box4 = document.querySelector("#box4");

let i = 0;

let qbox1 = document.querySelector("#box1");
let qbox2 = document.querySelector("#box2");
let qbox3 = document.querySelector("#box3");
let qbox4 = document.querySelector("#box4");

let qText = document.querySelector(".question-text");

let boxArr = [box1, box2, box3, box4];
let allBoxes = document.querySelectorAll(".box");
let score = 0;
let highScore = 0;
let questionNo = 0;

let category = ["RAP", "TECH", "VIDEO GAMES", "HISTORY"];
let selectedCategory = "";
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

function categoryList() {
  for (i = 0; i < category.length; i++) {
    console.log(category[i]);
  }
}

function findAnswer1(ans) {
  if (ans === qa.answer[rapQuestion.answerIdx[questionNo]]) {
    console.log("The previous question was q" + questionNo);
    questionNo++;
    score++;
    console.log("The question no now is " + questionNo);
    boxRefresh();
  } else {
    console.log("Not qbox1");
  }
}

function findAnswer2(ans) {
  if (ans === qa.answer[rapQuestion.answerIdx[questionNo]]) {
    console.log("The previous question was q" + questionNo);
    questionNo++;
    score++;
    console.log("The question no now is " + questionNo);
    boxRefresh();
  } else {
    console.log("Not qbox1");
  }
}

function findAnswer3(ans) {
  if (ans === qa.answer[rapQuestion.answerIdx[questionNo]]) {
    console.log("The previous question was q" + questionNo);
    questionNo++;
    score++;
    console.log("The question no now is " + questionNo);
    boxRefresh();
  } else {
    console.log("Not qbox1");
  }
}

function findAnswer4(ans) {
  if (ans === qa.answer[questionNo]) {
    console.log("The previous question was q" + questionNo);
    questionNo++;
    score++;
    console.log("The question no now is " + questionNo);
    boxRefresh();
  } else {
    console.log("Not qbox4");
  }
}
//makes boxes disappear, reappear with the correct question/answer, and generates the question title text.
function boxRefresh() {
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
  }, 001);

  setTimeout(function () {
    for (i = 0; i < boxArr.length; i++) {
      boxArr[i].classList.add("box");
      boxArr[i].classList.remove("box-invis");
    }
    for (i = 0; i < boxArr.length; i++) {
      boxArr[i].textContent = qa.answer[i];
      console.log(qa.answer[i]);
    }
    qText.textContent = qa.question;
  }, 500);

  qbox1.addEventListener("click", function (e) {
    switch (selectedCategory) {
      case "RAP":
        console.log(e.target.textContent + " BABYYYY");
        findAnswer1(e.target.innerHTML);
        break;
    }
  });

  qbox2.addEventListener("click", function (e) {
    switch (selectedCategory) {
      case "RAP":
        console.log(e.target.textContent + " BABYYYY");
        findAnswer2(e.target.innerHTML);
        break;
    }
  });

  qbox3.addEventListener("click", function (e) {
    switch (selectedCategory) {
      case "RAP":
        console.log(e.target.textContent + " BABYYYY");
        console.log(e.target);
        findAnswer3(e.target.innerHTML);
        break;
    }
  });
  qbox4.addEventListener("click", function (e) {
    switch (selectedCategory) {
      case "RAP":
        console.log(e.target.textContent + " BABYYYY");
        findAnswer4(e.target.innerHTML);
    }
  });
}

function homeBtn(e) {
  switch (e.target.textContent) {
    case "RAP":
      console.log("Text is currently: " + e.target.textContent);
      selectedCategory = "RAP";
      console.log("Selected category: " + selectedCategory);
      boxRefresh();
      break;

    case "TECH":
      console.log("Not Yet Available.");
      break;
    case "VIDEO GAMES":
      console.log("Not Yet Available.");
      break;
    case "HISTORY":
      console.log("Not Yet Available.");
      break;
  }
}

box1.addEventListener("click", homeBtn);

box2.addEventListener("click", homeBtn);

box3.addEventListener("click", homeBtn);

box4.addEventListener("click", homeBtn);

categoryList();
