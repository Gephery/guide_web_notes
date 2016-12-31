/**
 * Created by gephery on 12/30/16.
 */

var matrix = require('../matrix/matrixNode.js');

// Declare and visual on that it crated properly
var max = new matrix(4, 2);
console.log("The initial matrix is " + max.toString());

// Add a fraction made with an integer then print it
//max.add(3);
//console.log("Adding int result: " + max.toString());

// Adding a fraction pre made
var temp = new matrix(1, 20);
max.add(temp);
console.log("Adding node " + max.toString());

// Subtraction in similar fashions
//max.subtract(3);
//console.log("Subtracting int result: " + max.toString());

// Adding a fraction pre made
var temp2 = new matrix(1, 21);
max.add(temp2);
console.log("Subtracting node " + max.toString());
