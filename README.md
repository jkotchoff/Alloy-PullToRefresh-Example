# Alloy *Pull to Refresh* Widget Example [![Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://www.appcelerator.com/titanium/) [![Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://www.appcelerator.com/alloy/)

## Overview
This *Pull to Refresh* implementation in Titanium Alloy features [ListView collection binding](https://github.com/cornflakesuperstar/Alloy-PullToRefresh-Example/commit/764e17e697a4f675478a0946bcfc3ecc96e7c50f) which is mostly based on:
[FokkeZB's Infinite Scroll widget - Test](https://github.com/FokkeZB/nl.fokkezb.infiniteScroll/tree/test)

It is mostly based on:
[Jolicode's Alloy-PullToRefresh widget](https://github.com/jolicode/Alloy-PullToRefresh)

 
however it uses the:
[cornflakesuperstar Alloy-PullToRefresh Fork](https://github.com/cornflakesuperstar/Alloy-PullToRefresh)

in order to be able to build the ListView for the Pull to Refresh widget in the [same alloy view](https://github.com/cornflakesuperstar/Alloy-PullToRefresh-Example/blob/master/app/views/index.xml) as the widget itself

ie.


* Define the widget and the *ListView* in a view:

  ```xml
  <Alloy>
    <Collection src="tidev" id="listCollection" instance="true" />
    <Window id="index" class="container">
      <Widget id="pulltorefresh" src="com.jolicode.pullToRefresh"></Widget>
      <ListView id="list">
        <ListSection dataCollection="$.listCollection">
          <ListItem title="{title}" />
        </ListSection>
      </ListView>
    </Window>
  </Alloy>
  ```

* Bind the refresh functionality in the controller:

  ```javascript
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
  ```
