var refreshFn = function(){
  $.listCollection.fetch({
    success: function(model, response) {
      console.log("data retrieved");
    },
    error: function(model, message){
      alert("data fetch error: " + message);
    }
  });
};

$.index.addEventListener("open", function(){
  refreshFn();
});

$.index.open();
