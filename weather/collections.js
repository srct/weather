WeatherData = new Meteor.Collection("weatherdata");

if(Meteor.isClient) {
  Meteor.subscribe("weatherdata");
}
if(Meteor.isServer) {
  Meteor.publish("weatherdata", function () {
    return WeatherData.find();
  });
  WeatherData.deny({
    //No one is allowed to insert but server
    insert: function () {
      return false;
    }
  });
}
