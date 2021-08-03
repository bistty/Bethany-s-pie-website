window.addEventListener("DOMContentLoaded", function () {
  orderButtons = document.querySelectorAll("button[data-order]");

  let order;
  orderButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const button = e.currentTarget;
      const container = button.parentNode;

      order = {
        id: button.getAttribute("data-order"),
        title: container.querySelector(".title").innerText,
        price: container.querySelector(".price").innerText,
        desc: container.querySelector(".desc").innerText,
      };
      console.log(order.id, order.title, order.price, order.desc);
      localStorage.setItem("order", JSON.stringify(order));

      const url = window.location.href.replace("pies.html", "order.html");
      window.location.href = url;
    });
  });

  order = localStorage.getItem("order");

  if (order) {
    const pieOrder = JSON.parse(order);

    const pieContainer = document.querySelector(".pie");

    const title = pieContainer.querySelector(".title");

    const price = pieContainer.querySelector(".price");

    const desc = pieContainer.querySelector(".desc");

    const img = pieContainer.querySelector("img");

    title.innerText = pieOrder.title;
    price.innerText = pieOrder.price;
    desc.innerText = pieOrder.desc;
    img.setAttribute("src", `./images/${pieOrder.id}.png`);
  }

  // form

  //firebase
  var firebaseConfig = {
    apiKey: "AIzaSyAobJdtgh2eRPSxS7-pczCS8MpT6kf71Nk",
    authDomain: "bethany-s-pie.firebaseapp.com",
    databaseURL: "https://bethany-s-pie-default-rtdb.firebaseio.com",
    projectId: "bethany-s-pie",
    storageBucket: "bethany-s-pie.appspot.com",
    messagingSenderId: "999401576028",
    appId: "1:999401576028:web:845363cd6428ebb262f899",
    measurementId: "G-1YZJ021HPX",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var messageRef = firebase.database().ref("messages");

  const contactForm = document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const form = {
        firstName: getInputValues("first-name"),
        lastName: getInputValues("last-name"),
        address: getInputValues("address"),
        state: getInputValues("state"),
        postalCode: getInputValues("postal-code"),
        comments: getInputValues("comments"),
        orders: JSON.parse(order),
      };
      saveMessages(form);
      document.getElementById("contactForm").reset();
      //show alert

      const modal = document.querySelector(".modal");
      const overlay = document.querySelector(".overlay");

      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");

      setTimeout(() => {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        const url = window.location.href.replace("order.html", "pies.html");
        window.location.href = url;
      }, 3000);
    });

  function getInputValues(id) {
    return document.getElementById(id).value;
  }

  function saveMessages(form) {
    var newMessageRef = messageRef.push();
    newMessageRef.set(form);
  }

  const openModal = function () {};

  const closeModal = function () {};
});
