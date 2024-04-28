const cards = document.getElementById("cards");
const filterBtns = document.querySelectorAll(".filter__btn");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const basketCount = document.getElementById("basketCount");
let basket;
if (localStorage.getItem("basket")) {
  basket = JSON.parse(localStorage.getItem("basket"));
} else {
  basket = [];
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getFlowers() {
  fetch("http://localhost:3000/flowers")
    .then((response) => response.json())
    .then((data) => {
      if (localStorage.getItem("flowers")) {
        flowers = JSON.parse(localStorage.getItem("flowers"));
      } else {
        flowers = data;
        localStorage.setItem("flowers", JSON.stringify(flowers));
      }

      renderUI(data);
      displayMenuButtons(data);
    });
}

getFlowers();

function renderUI(data) {
  innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    innerHTML += `<div class="card">
    <img src="${data[i].img}" alt="">
    <p>${data[i].name}</p>
    <span>$${data[i].price}</span>
    <button onclick="addToBasket(${data[i].id})">add to card</button>
    </div>`;
  }

  cards.innerHTML = innerHTML;
}

function displayMenuButtons(data) {
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const menuCategory = data.filter(function (menuItem) {
        if (menuItem.type.includes(category)) {
          return menuItem;
        }
      });
      if (category === "all") {
        renderUI(data);
      } else {
        renderUI(menuCategory);
      }
    });
  });
}

function addToBasket(id) {
  let basketItem = basket.find((x) => x.id == id);

  if (!basketItem) {
    Toastify({
      text: "Item added to basket",
      className: "danger",
      duration: 700,

      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    let target = flowers.find((item) => item.id == id);
    let newBasketItem = {
      ...target,
      count: 1,
      totalPrice: target.price,
    };
    basket.push(newBasketItem);
    localStorage.setItem("basket", JSON.stringify(basket));
  } else {
    Toastify({
      text: "Item added to basket",
      className: "danger",
      duration: 700,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    basketItem.count++;
    basketItem.totalPrice = basketItem.price * basketItem.count;
    localStorage.setItem("basket", JSON.stringify(basket));
  }
  getBasketCount(basket);
}

function getBasketCount(basket) {
  if (localStorage.getItem("basket") != null) {
    let priceSum = basket.reduce((acc, el) => acc + el.totalPrice, 0);
    cartTotalPrice.innerText = `($${priceSum})`;
  }
  if (localStorage.getItem("basket") != null) {
    let countSum = basket.reduce((acc, el) => acc + el.count, 0);
    basketCount.innerText = `${countSum}`;
  }
}
getBasketCount(basket);
