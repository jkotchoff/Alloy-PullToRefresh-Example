var listTopOffset = 20;
var refreshFn = function(){
  $.listCollection.fetch({
    success: function(collection) {
      console.log("data retrieved");
      $.pulltorefresh.stop(collection.models.length * 240, 20);
    },
    error: function(model, message){
      alert("data fetch error: " + message);
      $.pulltorefresh.stop(0, listTopOffset);
    }
  });
};

var initialised = false;
$.index.addEventListener("open", function(){
  if(!initialised) {
    var list = $.list;
    $.index.remove(list);

    $.pulltorefresh.initialize({
      control: list,
      onRelease: refreshFn,
        headerPullView: {
          lastUpdate: {
            width: '230dp'
          }
        }  
    });  
  }
  refreshFn();
});

$.index.open();

