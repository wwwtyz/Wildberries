import { getNewTag, appendTag, setLocal } from "./utils.js";

let url = "https://62710199e1c7aec428fa9292.mockapi.io/clothes";
let app = document.querySelector(".cards");
let cartInfo = [];

//увеличить при клике
app.addEventListener("click", ({ target }) => {
  if (target.className === "card-img-top") {
    target.style.transform = "scale(1.5)";
    target.parentElement.style.zIndex = "10";
    target.nextSibling.style.zIndex = "-1";
    target.nextSibling.nextSibling.style.zIndex = "-1";
  }
});
app.addEventListener("mouseout", ({ target }) => {
  if (target.className === "card-img-top") {
    target.style.transform = "scale(1.0)";
    target.parentElement.style.zIndex = "1";
    target.nextSibling.style.zIndex = "3";
    target.nextSibling.nextSibling.style.zIndex = "3";
  }
});

//получить данные
async function getData(url) {
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    console.warn(error);
  }
  let data = await response.json();
  return data;
}

//рендер карточек
async function render(arr) {
  let array = await arr;
  array.forEach((element) => {
    cardCreate(element);
  });
}

window.addEventListener("load", () => {
  let localData = localStorage.getItem("data");
  if (localData) {
    cartInfo = JSON.parse(localData);
    renderCart(cartInfo);
  }
  render(getData(url));
});
//набор карточки
function cardCreate({ title, price, discount, image, id }) {
  let card = getNewTag("div", "card");
  card.dataset.id = id;
  let cardBody = getNewTag("div", "card-body");
  let cardTitle = getNewTag("p", "card-title", title);
  let cardPriceBox = getNewTag("div", "card-price-box");
  let cardPrice = getNewTag("p", "card-text", `${price} BYN`);
  cardPrice.style.textDecoration = "line-through";
  let cardDiscountBox = getNewTag("div", "card-disc-box");
  let cardDiscount = getNewTag("p", "card-text", `-${discount}%`);
  let realPrice = getNewTag(
    "h5",
    "card-text",
    `${((price * (100 - discount)) / 100).toFixed(2)} BYN`
  );
  let buyBtn = getNewTag("button", "btn");
  buyBtn.classList.add("btn-primary");
  buyBtn.dataset.id = id;
  let cardImageBox = getNewTag("div", "card-img-box");
  let cardImage = getNewTag("img", "card-img-top");
  cardImage.dataset.id = id;
  cardImage.setAttribute("src", `${image}`);
  cardImage.setAttribute("alt", `${title}`);

  appendTag(app, card, cardImageBox, cardImage);
  appendTag(cardImageBox, cardDiscountBox, cardDiscount);
  appendTag(cardImageBox, buyBtn);
  appendTag(card, cardBody, cardPriceBox, realPrice);

  appendTag(cardPriceBox, cardPrice);
  appendTag(cardBody, cardTitle);
}

//поиск
let inputSearch = document.querySelector(".form-control");
inputSearch.addEventListener("input", search);
async function search() {
  let data = await getData(url);
  let newData = [];
  data.forEach((e) => {
    e.title.toLowerCase().includes(inputSearch.value.toLowerCase())
      ? newData.push(e)
      : null;
  });
  app.innerHTML = "";
  render(newData);
}

//модальное окно
let modal = document.querySelector(".modal-body");
let ol = document.querySelector("#modal-list");
let cart = document.querySelector("#cart-btn");
cart.addEventListener("click", () => {
  let modalWin = document.querySelector("#staticBackdrop");
  modalWin.classList.add("show");
  let div = getNewTag("div", "modal-backdrop");
  div.classList.add("fade");
  div.classList.add("show");
  let body = document.body;
  body.classList.add("modal-open");
  appendTag(body, div);
});

let divModalBack = document.querySelector(".modal");
divModalBack.addEventListener("click", closeModal);

function closeModal({ target }) {
  if (
    target.className === "modal fade show" ||
    target.className === "btn-close"
  ) {
    let div = document.querySelector(".modal-backdrop");
    div.remove();
    let modalWin = document.querySelector("#staticBackdrop");
    modalWin.classList.remove("show");
    document.body.classList.remove("modal-open");
  }
}
let totalCostSpan = document.querySelector(".total-cost");
let totalCost = 0;
app.addEventListener("click", addNewItem);

let clearBtn = document.querySelector("#btn-modal");
clearBtn.addEventListener("click", () => {
  ol.innerHTML = "Корзина пуста";
  totalCost = 0;
  totalCostSpan.innerHTML = "";
  cartInfo = [];
  setLocal("data", cartInfo);
});

async function addNewItem({ target }) {
  if (target.tagName === "BUTTON") {
    ol.innerHTML = "";
    let id = target.dataset.id - 1;
    let data = await getData(url);

    let obj = {
      title: data[id].title,
      price: data[id].price,
      discount: data[id].discount,
      dataId: data[id].id,
    };
    cartInfo.push(obj);
    renderCart(cartInfo);
    setLocal("data", cartInfo);
  }
}

async function renderCart(data) {
  let ol = document.querySelector("#modal-list");
  ol.innerHTML = "";
  totalCost = 0;

  await data.forEach((e) => {
    let li = getNewTag("li");
    let div = getNewTag("div", "d-flex");
    div.classList.add("justify-content-between");
    let title = getNewTag("h5", "", `${e.title}`);
    let cost = getNewTag(
      "span",
      "",
      `${((e.price * (100 - e.discount)) / 100).toFixed(2)} BYN`
    );
    totalCost += +(e.price * (100 - e.discount)) / 100;

    totalCostSpan.innerText = totalCost.toFixed(2) + "BYN";
    appendTag(ol, li, div, title);
    appendTag(div, cost);
  });
}

let indicators = document.querySelector(".carousel-indicators");
indicators.addEventListener("click", ({ target }) => {
  console.log(target.classList);
  for (let i = 0; i < indicator.length + 1; i++) {
    if (
      target.classList.contains("carusel-btn") &&
      target == indicator[i - 1]
    ) {
      currentSlide(i);
    }
  }
});
let indicator = document.getElementsByClassName("carusel-btn");
let backBtn = document.querySelector(".carousel-control-prev");
let nextBtn = document.querySelector(".carousel-control-next");
nextBtn.addEventListener("click", () => {
  nextSlide(1);
});
backBtn.addEventListener("click", () => {
  nextSlide(-1);
});
let carusel = document.querySelector(".carousel-inner");
let slides = document.getElementsByClassName("carousel-item");
let slideID = 1;

showSlide(slideID);
function showSlide(n) {
  if (n < 1) {
    slideID = slides.length;
  } else if (n > slides.length) {
    slideID = 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    indicator[i].classList.remove("active");
  }

  console.log(slideID - 1);
  console.log(n);
  slides[slideID - 1].classList.add("active");
  indicator[slideID - 1].classList.add("active");
}

function nextSlide(n) {
  showSlide((slideID += n));
}

function currentSlide(n) {
  showSlide((slideID = n));
}
