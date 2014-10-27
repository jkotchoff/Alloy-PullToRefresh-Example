$.index.addEventListener("open", function(){
  $.pulltorefresh.initialize({
    arguments: {},
    controller: 'listview'  
  });  
});

$.index.open();
