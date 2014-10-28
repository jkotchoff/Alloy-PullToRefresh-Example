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

var list = $.list;
if(OS_ANDROID){
  $.index.remove(list);
}

$.index.addEventListener("open", function(){
  $.pulltorefresh.initialize({
    control: list,
    onRelease: refreshFn,
      headerPullView: {
        lastUpdate: {
          width: '230dp'
        }
      }  
  });  
  refreshFn();
});

$.index.open();

