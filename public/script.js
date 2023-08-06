let list = document.querySelector(".list");

function addTask() {
  let li = document.createElement("li");
  let addItem = document.querySelector(".add-item");
      if(addItem.value === "") {
        alert("Enter a task");
      } else {
        li.innerHTML = addItem.value;
        list.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "X";
        li.appendChild(span);
      }
      addItem.value = "";
    }

list.addEventListener("click", function(e) {
  if(e.target.tagName === "LI") {
    e.target.classList.toggle("checked")
  } else if(e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
})