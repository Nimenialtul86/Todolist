const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://voicu:Irefutabil1986@cluster0.ty95ttd.mongodb.net/todolistDB")

// index

const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
  name: "Welcome to your todolist"
});

const item2 = new Item ({
  name: "Hit the + button to add a new item."
});


const defaultItems = [item1, item2];

// end of index


//Work

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

const list1 = new List ({
  name: "Add your task"
});

const list2 = new Item ({
  name: "Hit the + button to add a new item."
});

const defaultList = [list1, list2];

// End of work

app.get("/", (req, res) => {
  Item.find({}).then(function(FoundItems){
    
    if(FoundItems.length === 0) {
      Item.insertMany(defaultItems).then(function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Succes")
        }
      });
      res.redirect("/")
    } else {
      res.render("index.ejs", {newItems: FoundItems});
    }

  });
  
});

  app.get("/work", (req, res) => {
    List.find({}).then(function(FoundItems){
    
      if(FoundItems.length === 0) {
        List.insertMany(defaultList).then(function(err) {
          if(err) {
            console.log(err);
          } else {
            console.log("Succes")
          }
        });
        res.redirect("/work")
      } else {
        res.render("work.ejs", {workItems: FoundItems});
      }
  
    });
  });


  app.post("/", (req, res) => {
    const newItem = req.body.newItem;
    const items = new Item ({
      name: newItem
    })
    defaultItems.push(items)
    items.save();
    res.redirect("/")
  });

  app.post("/work", (req, res) => {
    const newItem = req.body.newItem;
    const item = new List ({
      name: newItem
    })
    defaultList.push(item)
    item.save();
    res.redirect("/work")
  });

  app.post("/delete", (req, res) => {
    const deleteItem = req.body.delete;
    Item.findByIdAndRemove(deleteItem)
.then(function () {
    console.log("Successfully removed");
})
.catch(function (err) {
    console.log(err);
});
res.redirect("/");
  })


  app.post("/delete2", (req, res) => {
    const deleteItem = req.body.delete;
    List.findByIdAndRemove(deleteItem)
.then(function () {
    console.log("Successfully removed");
})
.catch(function (err) {
    console.log(err);
});
res.redirect("/work");
  })


  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  