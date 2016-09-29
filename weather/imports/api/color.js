//NOTES
//This file's main function will be called for each time of weather, evrey update.
//therefore this file needs to be optimiezed to be as fast as possible
//this is not implemented yet and just a proof of concept to start work
// will be implemented once we get live numbers to frontend


//var deg = 20; //degrees in numbers
//var type = true; // type meaans farenheit or celcius

// true farenheit
// false celcius

//main function
function colorMain(type,deg) {
  if (type = true) {
    return degToColor(deg);
  } else {
    return degToColor(convertToF(deg));
  }
}
//deg needs to be farenheit
function degToColor(deg) {
   switch (true) {
    case deg < 10:
      text = "#6b469c";
      break;
    case deg < 20:
      text = "#a0c9c1";
      break;
    case deg < 30:
      text = "#3ec2cf";
      break;
    case deg < 40:
      text = "#007dc5";
      break;
    case deg < 50:
      text = "#425195";
      break;
    case deg < 60:
      text = "#a39382";
      break;
    case deg < 70:
      text = "#ffcc33";
      break;
    case deg < 80:
      text = "#f7941e";
      break;
    case deg < 90:
      text = "#f37021";
      break;
    case deg < 100:
      text = "#ac1d37";
      break;
    case deg > 100:
      text = "#a62380";
      break;
    default:
      text = "F433FF";

  }
  return text;
}


function convertToF(CDeg){
  Fdeg = Cdeg*(9/5)+32;
  return Fdeg;
}
console.log(colorMain(true,0));
console.log(colorMain(true,10));
console.log(colorMain(true,20));
console.log(colorMain(true,30));
console.log(colorMain(true,40));
console.log(colorMain(true,50));
console.log(colorMain(true,60));
console.log(colorMain(true,70));
console.log(colorMain(true,80));
console.log(colorMain(true,90));
console.log(colorMain(true,100));
console.log(colorMain(true,110));
console.log(colorMain(true,120));
console.log(colorMain(true,130));
