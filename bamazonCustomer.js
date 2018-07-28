var mysql = require("mysql");
var inquirer = require("inquirer");
var allRows;
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Merosathi18?",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user

  Search();
});

  
    function Search() {
        connection.query("SELECT * FROM products", function (err, result, fields) {
            if (err) throw err;
            for(var i=0; i< result.length;i++){
                console.log("| "+result[i].item_id+" |"+result[i].product_name+" |"+ "$"+result[i].price+" |");
            }
            allRows = result;
            productsSearch(); 
        });
        

    }

    function productsSearch() {
        inquirer
          .prompt([
              {
            name: "name_id",
            message: "Pick item you would like to buy by ID?",
            type: "input"
          },
          {
            name: "name_quantity",
            message: "Enter number of items to order?",
            type: "input"
          }
        ])
          .then(function(answer) {

              var index = answer.name_id - 1;

              var orderQuanity = answer.name_quantity;              
              var availableQuantity = allRows[index].stock_quantity;  

              var remainingQuantity = availableQuantity - orderQuanity;
              if(orderQuanity > availableQuantity){
                  console.log("ORDEr EXCEEDS THE AVAILABLE STOCK");
                  console.log("Please place order again with lower quantity");
              }else{
                var updateQuery = "UPDATE products SET stock_quantity="+remainingQuantity+" where item_id ="+answer.name_id;
              
                connection.query(updateQuery, function (err, result, fields) {
                  if (err) throw err;
                  if(result.changedRows > 0){
                      console.log("Your order is placed!")
                      var price = allRows[index].price;
                      var total = price * orderQuanity;
                      console.log("Your total cost is $" + total);
                      console.log("THANK YOU FOR SHOPPING WITH US, HAVE A BLESSED REST OF THE DAY!!")
                  }
                });
              }
             
        })
    }
    
    
