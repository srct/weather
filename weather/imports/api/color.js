//this is not implemented yet and just a proof of concept to start work, will be implemented once we get live numbers to frontend
var deg;
var type = true;

// true farenheit
// false celcius


function colorMain(type,deg) {
  if (type = true) {
    colorConversion(deg);
  } else {
    colorConversion(convertToF(deg));
  }
}
//deg needs to be farenheit
function colorConversion(deg) {
  //todo

}


function convertToF(CDeg){
  Fdeg = Cdeg*(9/5)+32;
  return Fdeg;
}
