const inputName = document.querySelector(".lesson-name");
const inputScore = document.querySelector(".lesson-score");
const inputUnit = document.querySelector(".lesson-unit");
const submitBtn = document.querySelector(".submit-btn");
const reasonBtn = document.querySelector(".reason-btn");
const resetBtn = document.querySelector(".reset-btn");
const lessonsInfo = document.querySelector(".lessons-info");
const body = document.querySelector(".container");

let logEntery = [];

const getData = (lesson, score, unit) => {
   const lessonInfo = {
      name: lesson,
      score: score,
      unit: unit,
      reason: score * unit,
   };
   logEntery.push(lessonInfo);
   return lessonInfo;
};

submitBtn.addEventListener("click", () => {
   let lessonName = inputName.value;
   let lessonScore = +inputScore.value;
   let lessonUnit = +inputUnit.value;
   getData(lessonName, lessonScore, lessonUnit);
   let info = document.createElement("div");
   info.textContent = `Lesson ${lessonName} Score is ${lessonScore} by Unit: ${
      lessonScore * lessonUnit
   } !`;
   info.className = "alert";
   info.classList.add("alert-secondary");
   body.appendChild(info);
   inputName.value = "";
   inputScore.value = "";
   inputUnit.value = "";
});

reasonBtn.addEventListener("click", () => {
   let unitSum = 0;
   let reasonSum = 0;
   for (let obj of logEntery) {
      unitSum += obj.unit;
      reasonSum += obj.reason;
   }
   console.table(logEntery);
   let average = reasonSum / unitSum;
   console.log(`The average is ${average} !`);
});

resetBtn.addEventListener("click", () => {
   location.reload();
});
