

  /* If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.*/

var inquirer = require("inquirer");
var mysql = require("mysql");

var itemId = 0;
var quantity = 0;
var ammountToAdd = 0;
var newName = "";
var newDName = "";
var setPrice = 0;
var setStock = 0;

var count = 0;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306, 

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon" 
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  
  start();

});

function start(){
	process.stdout.write('\033c');
	inquirer.prompt([
	  {
	  	type: "list",
	  	message: "What would you like to do?",
	  	choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
	  	name: "ans"
	  	
	  }
	]).then(function(info){
		switch(info.ans){
			case "View Products for Sale":
				listAllItems();					//the item IDs, names, prices, and quantities.
				break;
			case "View Low Inventory":
				lowInventory();
				break;
			case "Add to Inventory":
				getItemId();
				break;
			case "Add New Product":
				makeNewProduct();
				break;
		}
	});
}

function listAllItems(){
	process.stdout.write('\033c');

	connection.query("SELECT * FROM products", function(err, res){

		for(var i = 0; i < res.length; i++){
			if(res[i].stock_quantity > 0){
				console.log("____________________________________");
				console.log("Item id: " + res[i].item_id);
				console.log("Product Name: "+ res[i].pName);
				console.log("Price: $" + res[i].price);
			}
		}


		console.log("____________________________________");

		promptOptions();
	});
}

function promptOptions(){
	inquirer.prompt([
	  {
	  	type: "list",
	  	message: "What would you like to do now?",
	  	choices: ["Back to Menu", "Exit"],
	  	name: "ans"
	  	
	  }
	]).then(function(info){
		switch(info.ans){
			case "Back to Menu":
				start();					//the item IDs, names, prices, and quantities.
				break;
			case "Exit":
				process.stdout.write('\033c');
				console.log("Take Care!");
				process.exit(-1);
				break;
		}
	});
}

function lowInventory(){
	process.stdout.write('\033c');

	connection.query("SELECT * FROM products", function(err, res){

		for(var i = 0; i < res.length; i++){
			if(res[i].stock_quantity > 0 && res[i].stock_quantity <= 5){
				console.log("____________________________________");
				console.log("Item id: " + res[i].item_id);
				console.log("Product Name: "+ res[i].pName);
				console.log("Price: $" + res[i].price);
				console.log("Items in stock: " + res[i].stock_quantity);

				count++;
			}
		}
	
		if(count > 0){
			console.log("____________________________________");
		}
		else{
			console.log("                              ");
			console.log("No items below 5 in inventory!");
			console.log("                              ");
		}

		promptOptions();
	});

}

function getItemId(){
	process.stdout.write('\033c');
	
	connection.query("SELECT * FROM products", function(err, res){
		for(var i = 0; i < res.length; i++){
			if(res[i].stock_quantity > 0){
				console.log("____________________________________");
				console.log("Item id: " + res[i].item_id);
				console.log("Product Name: "+ res[i].pName);
				console.log("Price: $" + res[i].price);
				console.log("Items in stock: " + res[i].stock_quantity);
			}
		}

		inquirer.prompt([
		{
			name: "ans",
		  	message: "Enter the id of the item you wish to re-stock?",
		  	validate: function(value) {

	          	if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 200) {
	          		return true;
	          	}

	          	return false;
        	}
		}

		]).then(function(info){
			itemId = info.ans;
			getStockQuantity();
			amountToAdd();
		});


	});
}

function getStockQuantity(){

	connection.query("SELECT * FROM products WHERE item_id=" + itemId, function(err, res){
		quantity = res[0].stock_quantity;
	});
		
}

function amountToAdd(){

	inquirer.prompt([
		{
		  	message: "How many units would you like to add?",
		  	name: "ans",
		  	validate: function(value) {

	          	if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 200) {
	          		return true;
	          	}

	          	return false;
        	}
		}

		]).then(function(info){

			ammountToAdd = parseInt(info.ans);
			quantity += ammountToAdd;
			
			addInventory();
		});
}

function addInventory(){
	

	connection.query("UPDATE products SET stock_quantity=" + quantity + " WHERE item_id = " + itemId + ";",
		function(err, res) {
	    	//console.log(quantity);
	    	//console.log(itemId);
	    	console.log("Updated Stock Quantity...");
	      	// Call deleteCrud AFTER the UPDATE completes
	      	promptOptions();
    	});
}

function makeNewProduct(){

	process.stdout.write('\033c');

	inquirer.prompt([
	{
	  	message: "Product Name: ",
	  	name: "ans"
	  	
	}
	]).then(function(info){

		newName = info.ans;
		
		addDept();
	});

}

function addDept(){

	inquirer.prompt([
	{
	  	message: "Add Product Department Name: ",
	  	name: "ans"
	  	
	}

	]).then(function(info){

		newDName = info.ans;
		
		addPrice();
	});

}

function addPrice(){

	inquirer.prompt([
	{
	  	message: "Add Price: ",
	  	name: "ans",
	  	validate: function(value) {

          	if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 200) {
          		return true;
          	}

          	return false;
    	}
	  	
	}

	]).then(function(info){

		setPrice = parseInt(info.ans);
		
		setStockQ();
	});
}

function setStockQ(){

	inquirer.prompt([
	{
	  	message: "Set Stock: ",
	  	name: "ans",
	  	validate: function(value) {

          	if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 200) {
          		return true;
          	}

          	return false;
    	}
	  	
	}

	]).then(function(info){

		setStock = parseInt(info.ans);
		
		createNewProduct();

	});
}

function createNewProduct(){

	connection.query('INSERT INTO products (pName, dName, price, stock_quantity) VALUES ("'+ newName +'", "' + newDName + '", ' + setPrice + ', ' + setStock + ');',
		function(err, res) {
	    	
	    	console.log("Inserted "+ setStock + " " + newName + "s to Products...");
	     	promptOptions();
    	});
	
}


