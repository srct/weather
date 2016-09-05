import './body.html';

for(var key in LOCATIONS) {
    var current = LOCATIONS[key];
    console.log(current.name);
    Meteor.call('weatherDataForLoc', current.lat, current.long, function(err, res){
        console.log(res);
        //Sends the result of the API call to the browser console, will change
    });
}
