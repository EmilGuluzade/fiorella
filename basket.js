const table = document.getElementById("table");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const basketCount=document.getElementById("basketCount");
let basket;
if (localStorage.getItem("basket")) {
  basket = JSON.parse(localStorage.getItem("basket"));
} else {
  basket = [];
  localStorage.setItem("basket", JSON.stringify(basket));
}
function getBasketCount(basket) {
  if (localStorage.getItem("basket") != null) {
    let priceSum = basket.reduce((acc, el) => acc + el.totalPrice, 0);
    cartTotalPrice.innerText = `($${ priceSum})`;
  }
  if (localStorage.getItem("basket") != null) {
    let countSum = basket.reduce((acc, el) => acc + el.count, 0);
    basketCount.innerText = `${countSum}`;
  }
}
getBasketCount(basket);

function renderUI(list) {
  innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    innerHTML += `
      <tr >
        <th> <button onclick="deleteHandler(${list[i].id})" style="border:none;background-color: #fff;margin-right: 20px;"><i class="fa-solid fa-xmark"></i></button>  <img width="100px" src="${list[i].img}" alt=""></th>
            <td>${list[i].price}$</td>
            <td>${list[i].count}</td>
            <td>${list[i].totalPrice}$</td>
        </tr>
      `;
  }
  table.innerHTML = innerHTML;
}
renderUI(basket);

function deleteHandler(id) {
  Toastify({
    text: "Item deleted from basket",
    className: "danger",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  let target = basket.find((e) => e.id == id);
if(target.count>1){
target.count--
target.totalPrice-=target.price
localStorage.setItem("basket", JSON.stringify(basket));
}else{
  let indexOfTarget = basket.indexOf(target);

  basket.splice(indexOfTarget, 1);
  localStorage.setItem("basket", JSON.stringify(basket));
}
  

  renderUI(basket);
  getBasketCount(basket);
}
