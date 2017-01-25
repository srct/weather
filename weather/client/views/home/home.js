Template.home.events({
  'click #fairfax-tab-button' (event) {
  },
  'click a.mdl-layout__tab-bar' (event) {
    console.log(event);
  }
});
Template.home.onRendered(function() {
  document.getElementById("#fairfax-tab-button").addEventListener("click", function(){
  });
});
