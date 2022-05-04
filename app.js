const body = document.querySelector("body");
const inputName = document.querySelector(".lesson-name");
const inputScore = document.querySelector(".lesson-score");
const inputUnit = document.querySelector(".lesson-unit");
const submitBtn = document.querySelector(".submit-btn");
const reasonBtn = document.querySelector(".reason-btn");
const resetBtn = document.querySelector(".reset-btn");
const lessonsInfo = document.querySelector(".lessons-info");
const container = document.querySelector(".container");
const popupWrapper = document.querySelector(".popup-wrapper");
const popupCard = document.querySelector(".popup");
const popupClose = document.querySelectorAll(".popup-close");
const popupContent = document.querySelector(".popup-content");

let logEntery = [];

/*getting data*/
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

/*showing data*/
submitBtn.addEventListener("click", () => {
   let lessonName = inputName.value;
   let lessonScore = +inputScore.value;
   let lessonUnit = +inputUnit.value;
   getData(lessonName, lessonScore, lessonUnit);
   let info = document.createElement("div");
   info.textContent = `Lesson ${lessonName} Score is ${lessonScore} by Unit: ${
      lessonScore * lessonUnit
   } !`;
   info.className = "alert , lessons-info";
   info.classList.add("alert-secondary");
   container.appendChild(info);
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
   let average = reasonSum / unitSum;
   if (!average) {
      average = 0;
   } else {}

   /*popup handling*/
   let popupWrapper = document.createElement("div");
   popupWrapper.className = "popup-wrapper";
   body.prepend(popupWrapper);
   popupWrapper.classList.add("show");
   popupCard.classList.add("show");
   popupContent.innerHTML = `<span class="container"> The average of your scores by the units is: ${average} !</span>`;

   let popupCloseFunc = () => {
      popupWrapper.classList.remove("show");
      popupCard.classList.remove("show");
   };

   popupClose.forEach((button) => {
      button.addEventListener("click", popupCloseFunc);
   });

   popupWrapper.addEventListener("click", popupCloseFunc);
});

resetBtn.addEventListener("click", () => {
   location.reload();
});
