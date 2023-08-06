function addTask() {

    let addItem = document.querySelector(".add-item");
    let list = document.querySelector(".list");
    
      if(addItem.value === "") {
        addItem.innerHTML = "No task entered";
      } else {
        let li = document.createElement("li");
        li.innerHTML = addItem.value;
        list.appendChild(li);
      }
      addItem.value = "";
    }

    addTask();