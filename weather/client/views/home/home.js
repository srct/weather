Template.home.onRendered(function(){

  // Add listeners to each tab to change the current location.
  // When locationName changes, the weather data is obained for the new location.
  //TODO: Use Meteor's built in event system (see below)
  document.getElementById('fairfax-tab-button').addEventListener('click', function(){
    Session.set('locationName', 'FAIRFAX');
  });
  document.getElementById('arlington-tab-button').addEventListener('click', function(){
    Session.set('locationName', 'ARLINGTON');
  });
  document.getElementById('scitech-tab-button').addEventListener('click', function(){
    Session.set('locationName', 'SCITECH');
  });
  document.getElementById('korea-tab-button').addEventListener('click', function(){
    Session.set('locationName', 'KOREA');
  });

});

/*
  This is the proper way to handle event listeners in Meteor, but
  for some reason the events don't fire this way. Can't find a fix, so I
  implmented them using normal JavaScript + HTML seen above.

Template.home.events({
  'click #fairfax-tab-button': function() {
    Session.set('locationName', 'FAIRFAX');
  },
  'click #arlington-tab-button': function() {
    Session.set('locationName', 'ARLINGTON');
  },
  'click #scitech-tab-button': function() {
    Session.set('locationName', 'SCITECH');
  },
  'click #korea-tab-button': function() {
    Session.set('locationName', 'KOREA');
  }
});
*/
