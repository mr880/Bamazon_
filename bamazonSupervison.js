

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var dept_id = 0;
var tableSize = 0;

var idArr = [];
var nameArr = [];
var overHeadArr = [];

var id;
var name;
var overhead;
var totalSales;
var totalProfit;

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

var table = new Table({
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

function start(){
  process.stdout.write('\033c');
  
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["View Product Sales by Department", "Create New Department"],
      name: "ans"
    }
  ]).then(function(info){
    switch(info.ans){
      case "View Product Sales by Department":
        getTableSize();               
        break;
      case "Create New Department":
        createNewDept();
        break;
    }
  });
}

function getTableSize(){
  connection.query("SELECT * FROM departments;",function(err, res){
    //get table size
    tableSize = res.length;
    getDeptInfo();

  });
}

function getDeptInfo(){

  var salesTable = new Table({
      head: ["Id", "Department Name", "Overhead", "Total Sales", "Total Profit"],
      colWidths: [5, 20, 15, 15, 15]
  });

  connection.query("SELECT * FROM departments",function(err, res){
    for(var i=0; i<tableSize; i++){
    
      id = res[i].department_id;
      name = res[i].department_name;
      overhead = res[i].over_head_costs;
      totalSales = res[i].totalSales;
      totalProfit = (Math.round((totalSales - overhead) * 100)) / 100;
      
      //pSales = res[i].product_sales;
      salesTable.push(
        [id, name, overhead, totalSales, totalProfit]
      );

    }

    console.log(salesTable.toString());

  });
    
  
}



