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

/* getting data */
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

/* inputs number validation */
const isDigit = (value) => {
    let val;
    // value === "0" || Number(value) ? true : false;
    val = !!(value === "0" || Number(value));
    return val;
};

/* func for handling wrong inputs */
const inputStyleHandler = (element, state) => {
    if (state === false) {
        element.classList.add("wrong-input");
        element.classList.add("border-danger");
        element.classList.add("alert-danger");
    } else {
        element.classList.remove("wrong-input");
        element.classList.remove("border-danger");
        element.classList.remove("alert-danger");
    }
};

/* showing data */
submitBtn.addEventListener("click", () => {
    /* first validating inputs */
    if (isDigit(inputScore.value) && isDigit(inputUnit.value)) {
        inputStyleHandler(inputScore, true);
        inputStyleHandler(inputUnit, true);
        let lessonScore = +inputScore.value;
        let lessonUnit = +inputUnit.value;
        let lessonName = inputName.value;

        /* getting data */
        getData(lessonName, lessonScore, lessonUnit);

        /* create some shit to show data */
        let info = document.createElement("div");
        info.textContent = `Lesson ${lessonName} Score is ${lessonScore} by Unit: ${
            lessonScore * lessonUnit
        } !`;
        info.className = "alert , lessons-info";
        info.classList.add("alert-secondary");
        container.appendChild(info);

        /* delete button for that shit */
        let infoDeleteButton = document.createElement("span");
        infoDeleteButton.className = "delete-button float-end";
        info.appendChild(infoDeleteButton);
        infoDeleteButton.addEventListener("click", () => {
            info.parentNode.removeChild(info);
            // logEntery.pop();
        })

        /* clean inputs after submiting */
        inputName.value = "";
        inputScore.value = "";
        inputUnit.value = "";
    } else {
        if (
            isDigit(inputScore.value) === false &&
            isDigit(inputUnit.value) === false
        ) {
            inputStyleHandler(inputScore, false);
            inputStyleHandler(inputUnit, false);
        } else if (
            isDigit(inputScore.value) === false &&
            isDigit(inputUnit.value) === true
        ) {
            inputStyleHandler(inputScore, false);
            inputStyleHandler(inputUnit, true);
        } else if (
            isDigit(inputUnit.value) === false &&
            isDigit(inputScore.value) === true
        ) {
            inputStyleHandler(inputScore, true);
            inputStyleHandler(inputUnit, false);
        }
        return;
    }
});

reasonBtn.addEventListener("click", () => {
    /* calculating scores from object set */
    let unitSum = 0;
    let reasonSum = 0;
    for (let obj of logEntery) {
        unitSum += obj.unit;
        reasonSum += obj.reason;
    }
    let average = reasonSum / unitSum;
    if (!average) {
        average = 0;
    } else {
    }

    /* popup handling */
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
