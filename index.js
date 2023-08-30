const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/todolistDB")

// index

const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item", itemsSchema);


// end of index


//Work

const listSchema = {
  name: String
};

const List = mongoose.model("List", listSchema);

// End of work

app.get("/", (req, res) => {
  Item.find({}).then(function(FoundItems){
      res.render("index.ejs", {newItems: FoundItems});
    })
  })

  app.get("/work", (req, res) => {
    List.find({}).then(function(FoundList){
        res.render("work.ejs", {workItems: FoundList});
      })
    })


  app.post("/", (req, res) => {
    const newItem = req.body.newItem;
    const items = new Item ({
      name: newItem
    })
    items.save();
    res.redirect("/")
  });

  app.post("/work", (req, res) => {
    const newItem = req.body.newItem;
    const item = new List ({
      name: newItem
    })
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
  