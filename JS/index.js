const axios = require("axios");
let setVal = null;
let actualVal = null;
let actualPrice = document.getElementById("main-price");
let setValElement = document.getElementById("setval");
let setPriceElement = document.getElementById("set-price");
setValElement.value = 0;
var audio = new Audio("../assets/audio/you_suffer.mp3");
// audio.play();

function getBitCoinVal() {
  axios
    .get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD"
    )
    .then((res) => {
      console.log("%%%%%%%%%%%%%%%%", res);
      actualVal = res.data["BTC"]["USD"];
      actualPrice.innerText = `${parseFloat(actualVal)}$`;
      if (setVal !== null && setVal > parseFloat(actualVal)) {
        audio.play();
        const notification = {
          title: "Bitcoin Monitor",
          body: `Bitcoin dropped below ${setVal}$ , current price is ${parseFloat(
            actualVal
          )}$`,
        };
        const myNotification = new window.Notification(
          notification.title,
          notification
        );
      }
    });
}
function getVal() {
  if (
    parseFloat(setValElement.value) < 0 ||
    parseFloat(setValElement.value) !== parseFloat(setValElement.value)
  ) {
    alert("set price can not be Negative");
    return;
  }
  setVal = parseFloat(setValElement.value);
  setPriceElement.innerText = `${setVal}$`;
  console.log("clicked", typeof setVal);
}
setInterval(getBitCoinVal, 10000);
