var app = {
    // Application Constructor
    initialize: function() {
      this.bindEvents();
      localStorage.appurl = "http://catalog.data.ug/api/3/action/";
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      
      $("#search_tags").keyup(function (e) {
	
      if (e.keyCode == 13) {
        controller.loadList();
	
      }
      });
      
      $("#start_search").bind('click', function() {
        
	//TODO use web apis to check for internet
	//ckanrequest.checkOnline().then(function(){

          if($("#search_tags").val().length > 0){
            controller.loadList();
          }else{
            ckanrequest.loadingMsg("Enter Tags to Search", 3000);
          }

          //TODO catch no internet using web apis.
        //}).fail(function(){

          //ckanrequest.loadingMsg("Please connect to the internet to Search for Datasets", 3000);
        //});
        
      });

    }
};
