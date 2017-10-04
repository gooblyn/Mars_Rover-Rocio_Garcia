// Rover Objects
var rover1 = {
  position: "N", //position could be: N (north-dflt), S (south), E (east), W (west)
  x: 0, //coordinate X, default 0
  y: 0, //coordinate Y, default 0
  travelLog: []
};

var rover2 = {
  position: "N", //position could be: N (north-dflt), S (south), E (east), W (west)
  x: 0, //coordinate X, default 0
  y: 0, //coordinate Y, default 0
  travelLog: []
};

var rover3 = {
  position: "N", //position could be: N (north-dflt), S (south), E (east), W (west)
  x: 0, //coordinate X, default 0
  y: 0, //coordinate Y, default 0
  travelLog: []
};

// Obstacle's grid.
var grid = [
  [null, null, "O", null, null, null, null, null, null],
  ["O", null, null, null, null, null, "O", null, null],
  [null, null, "O", null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, "O", null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, "O", null, null, null, null, null, null],
  [null, null, null, "O", null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, "O", null, null]
];

function turnLeft(rover){
  switch (rover.position) {
    case "W":
      rover.position = "S";
      break;
    case "S":
      rover.position = "E";
      break;
    case "E":
      rover.position = "N";
      break;
    default: //default position is North (N)
      rover.position = "W";
      break;
  }
}

function turnRight(rover){
  switch (rover.position) {
    case "W":
      rover.position = "N";
      break;
    case "S":
      rover.position = "W";
      break;
    case "E":
      rover.position = "S";
      break;
    default: //default position is North (N)
      rover.position = "E";
      break;
  }
}

function moveForward(rover){
  // Create two new vars for saving the previous position of our rover
  var prevX=rover.x;
  var prevY=rover.y;

  // Create new var for access to the obstacle's matrix
  var element;

  // Checking if the next move takes the rover out of the grid
  if (((rover.x+1>9)&&(rover.position === "E")) ||
     ((rover.x-1<0)&&(rover.position === "W")) ||
     ((rover.y+1>9)&&(rover.position === "S")) ||
     ((rover.y-1<0)&&(rover.position === "N"))){
    console.log("STOP! You're trying to move off of the grid");
  }
  // If the move is inside the grid, let's move!
  else{
    switch (rover.position) {
      case "S":
        element = grid[rover.y+1][rover.x];
        // Checking if the next move runs the rover into an obstacle.
        if (element === "O"){
          console.log("STOP! There's an obstacle on your way.");
        }
        else if (element === "R"){
          console.log("STOP! There's another rover on your way.");
        }
        else{
          rover.y = rover.y+1;
          //Saving the last rover's position on the travelLog
          rover.travelLog.push(prevX+","+prevY);
        }
        break;
      case "W":
        element = grid[rover.y][rover.x-1];
        // Checking if the next move runs the rover into an obstacle.
        if (element === "O"){
          console.log("STOP! There's an obstacle on your way.");
        }
        else if (element === "R"){
          console.log("STOP! There's another rover on your way.");
        }
        else{
          rover.x = rover.x-1;
          //Saving the last rover's position on the travelLog
          rover.travelLog.push(prevX+","+prevY);
        }
        break;
      case "E":
        element = grid[rover.y][rover.x+1];
        // Checking if the next move runs the rover into an obstacle.
        if (element === "O"){
          console.log("STOP! There's an obstacle on your way.");
        }
        else if (element === "R"){
          console.log("STOP! There's another rover on your way.");
        }
        else{
          rover.x = rover.x+1;
          //Saving the last rover's position on the travelLog
          rover.travelLog.push(prevX+","+prevY);
        }
        break;
      default: // Default position is North (N)
        element = grid [rover.y-1][rover.x];
        // Checking if the next move runs the rover into an obstacle.
        if (element === "O"){
          console.log("STOP! There's an obstacle on your way.");
        }
        else if (element === "R"){
          console.log("STOP! There's another rover on your way.");
        }
        else{
          rover.y = rover.y-1;
          //Saving the last rover's position on the travelLog
          rover.travelLog.push(prevX+","+prevY);
        }
        break;
    }
  }
}

function moveBackward (rover){
  // Create two new vars for saving the previous position of our rover
  var prevX=rover.x;
  var prevY=rover.y;
  switch (rover.position) {
    case "S":
      rover.y = rover.y-1;
      rover.position = "N";
      break;
    case "W":
      rover.x = rover.x+1;
      rover.position = "E";
      break;
    case "E":
      rover.x = rover.x-1;
      rover.position = "W";
      break;
    default: // Default position is North (N)
      rover.y = rover.y+1;
      rover.position = "S";
      break;
  }
  //Saving the last rover's position on the travelLog
  rover.travelLog.push(prevX+","+prevY);
}

function commands (instructions, rover){
  grid[rover.y][rover.x]=null;
  for (var i=0; i<instructions.length; i++){
    switch (instructions[i]) {
      case "f":
        moveForward(rover);
        break;
      case "b":
        moveBackward(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      default:
        console.log("Movement: "+instructions[i]+" doesn't exist!");
        break;
    }
  }
  console.log("After moving my new position is: "+rover.x+","+rover.y+" and I'm looking at: "+rover.position);
  console.log("I've been in the following places: ");
  console.log(rover.travelLog);
  // Updating the grid with the new position of the rover
  grid[rover.y][rover.x]= "R";
}
