//selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener("DOMContentLoaded", getTodos());
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
// filterOption.addEventListener("click", filterTodo);
//functions

function addTodo(event) {
  //停止預設行為
  event.preventDefault();
  //新增todoDiv
  if (todoInput.value === "") {
    alert("請輸入文字");
  } else {
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //新增li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Add todo to local storage
    saveLocalTodos(todoInput.value);
    //check button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  console.log("delete");
  const item = e.target;
  console.log(item);
  // console.log(item.classList);
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    //!重要分享！
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //checked
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//!select onchange觀念!!
function filterTodo(e) {
  let todos = todoList.childNodes;
  console.log(todos);
  // let todos = filterOption.children;
  console.log(e.target.value);

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//safe todo
function saveLocalTodos(todo) {
  //check -----是否有東西在local
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // console.log(JSON.parse(localStorage.getItem("todos")));
    //?localStorage.getItem("todos")回傳是字串，使用JSON.parse()將它轉成陣列
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  //?setItem存成字串，使用JSON.stringify()將陣列轉為字串
  localStorage.setItem("todos", JSON.stringify(todos));
}

//addEventListener("DOMContentLoaded",getTodos)
function getTodos() {
  //check -----是否有東西在local
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //新增li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //check button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  //check -----是否有東西在local
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //!難的
  // console.log(todos.indexOf(''));給value得index
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//test
// const todos = ["apple", "john", "donut", "baby"];

// const johnIndex = todos.indexOf("john"); //index 1

// todos.splice(johnIndex, 1); //切掉john 切一個

// console.log(todos); //['apple', 'donut', 'baby']

//------------timer------------------------------------
let time = setInterval(myTimer, 1000);

function myTimer() {
  let d = new Date();
  // var t = d.toLocaleTimeString();
  let hr = d.getHours();
  hr = hr.toString().padStart(2, "0");
  let min = d.getMinutes();
  min = min.toString().padStart(2, "0");
  let mm = d.getMonth() + 1;
  let dd = d.getDate();
  let week = ["日", "一", "二", "三", "四", "五", "六"];
  document.querySelector("#clock").innerHTML = `${hr}<span>：</span>${min}`;
  document.querySelector("#date").innerHTML = `${mm}月${dd}日 星期${
    week[d.getDay()]
  }`;
}

//-----------Weather function--------------------------------------
const notificationEle = document.querySelector(".notification");
const iconEle = document.querySelector(".weather-icon");
const tempEle = document.querySelector(".temperature-value p");
const descEle = document.querySelector(".temperature-description p");
const locationEle = document.querySelector(".location p");
const weatherTitle = document.querySelector(".app-title");

const kelvin = 273;
const myKey = "e7e8f0bc1a9109d15a9922831bb782da";

// console.log(notificationEle, iconEle, tempEle, descEle, locationEle);

//天氣物件
const weather = {
  temperature: {
    value: 28,
    unit: "celsius",
  },
  description: "few cloud",
  iconId: "01d",
  city: "london",
  country: "GB",
};

// console.log(navigator.geolocation);
//取得geolocation in navigator
if ("geolocation" in navigator) {
  //!getCurrentPosition method
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationEle.style.display = "block";
  notificationEle.innerHTML = `<p>未取得位置</p>`;
}

function setPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  // console.log(position);
  // console.log(latitude, longitude);
  getWeather(latitude, longitude);
}

function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myKey}`;
  console.log(api);
  fetch(api)
    .then(function (response) {
      let data = response.json();
      console.log(data);
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - kelvin);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

//更新天氣data
function displayWeather() {
  iconEle.innerHTML = `<img src="icons/${weather.iconId}.png" />`;
  tempEle.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descEle.innerHTML = weather.description;
  locationEle.innerHTML = `${weather.city}, ${weather.country}`;
}

function refreshWeather() {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}

weatherTitle.addEventListener("click", refreshWeather);

tempEle.addEventListener("click", function () {
  //防止未取得data
  if (weather.temperature.value === undefined) {
    return;
  }
  if (weather.temperature.unit === "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);
    tempEle.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
    // console.log(weather.temperature.unit);
  } else {
    let celsius = weather.temperature.value;
    tempEle.innerHTML = `${celsius}°<span>C</span>`;
    weather.temperature.unit = "celsius";
    // console.log(weather.temperature.unit);
  }
});

//溫度單位轉換
function celsiusToFahrenheit(temperature) {
  let fahrenheit = (temperature * 9) / 5 + 32;
  return fahrenheit;
}

// Fun function(按一下掉光光光)-----------------------------
const funDiv = document.querySelector("#fun img");
console.log(funDiv);

funDiv.addEventListener("click", fun);

function fun(e) {
  console.log("Fundelete");
  playAudio("./sound/rick.wav");
  let todos = todoList.childNodes;
  console.log(todos.length);
  for (let i = 0; i < todos.length; i++) {
    console.log(todos[i]);
    if (i % 2 === 0) {
      todos[i].classList.add("fall");
    } else {
      todos[i].classList.add("fall-v2");
    }
  }
}

function playAudio(url) {
  new Audio(url).play();
}
