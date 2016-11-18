Template.home.events({
  'click #fairfax-tab-button' (event) {
    alert("FUCK");
  },
  'click a.mdl-layout__tab-bar' (event) {
    console.log("FUCK");
    console.log(event);
  }
});
Template.home.onRendered(function() {
  document.getElementById("#fairfax-tab-button").addEventListener("click", function(){
    alert("FUCK");
  });
});
