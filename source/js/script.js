let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

const failurePopUp = document.querySelector(".failure-pop-up");
const successPopUp = document.querySelector(".success-pop-up");
const formFeedback = document.querySelector(".get-feedback");
const btn = document.querySelector(".get-feedback__request");
const inputs = formFeedback.querySelectorAll("input[required]");

function setInitialState () {
  formFeedback.reset();
  failurePopUp.classList.remove("failure-pop-up--visible");
  successPopUp.classList.remove("success-pop-up--visible");
}

function sendForm (url, data) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, false);
  xhr.send(new FormData(data));

  if (xhr.status != 200) {
    failurePopUp.classList.add("failure-pop-up--visible");
  } else {
    successPopUp.classList.add("success-pop-up--visible");
    formFeedback.recet();
  }
};

//обработка клика отправки формы -> показ модальных окон
formFeedback.addEventListener("submit", function (event) {
  event.preventDefault();

  const api = formFeedback.getAttribute('action');

  const err = Array.from(inputs).find(function (el) {
    el.value === "";
  });

  if (!err) {
    sendForm(api, formFeedback);
  }
});

//закрывает модальное окно
failurePopUp.querySelector(".failure-pop-up__button").addEventListener("click", function () {
  failurePopUp.classList.remove("failure-pop-up--visible");
});

//закрывает модальное окно
successPopUp.querySelector(".success-pop-up__button").addEventListener("click", function () {
  successPopUp.classList.remove("success-pop-up--visible");
});

setInitialState();
