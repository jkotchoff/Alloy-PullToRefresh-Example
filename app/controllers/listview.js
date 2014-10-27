var args = arguments[0] || {};

var listTopOffset = 20;
var refreshFn = function(){
  $.listCollection.fetch({
    success: function(model, response) {
      console.log("data retrieved");
      var is_array = Object.prototype.toString.call( model ) === '[object Array]';
      var results_length = is_array ? model.length : 1; 
      args.pulltorefresh.stop(results_length * 240, listTopOffset);
    },
    error: function(model, message){
      alert("data fetch error: " + message);
      args.pulltorefresh.stop(0, listTopOffset);
    }
  });
};

args.pulltorefresh.setCallback(refreshFn);
refreshFn();
