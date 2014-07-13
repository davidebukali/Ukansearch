var app = {
  
  online: false,
  
    // Application Constructor
    initialize: function() {
      this.bindEvents();
      localStorage.appurl = "http://catalog.data.ug/api/3/action";
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      //use chosen library for url select
      $(".urlselect").chosen({
	width: "100%"
	
      });

      //clear textfield on select click
      $(".chosen-single").bind('click', function(e) {
	$("#url_inputs").val("");
	console.log("clicked url");
	
      });
      
      //
      $("#url_inputs").bind('click', function(e) {
	$(".chosen-single span").val("Select URL");
	
      });
      
      window.addEventListener("offline", function(e) {
	app.online = false;
	console.log("we are offline");
      })
      
      window.addEventListener("online", function(e) {
	app.online = true;
	console.log("we are online");
	
      })
      
      $("#set_url").bind('click', function(e) {
	
	if($("#url_inputs").val().length > 0) {
	  if($("#url_inputs").val().indexOf("catalog.data") != -1 || $("#url_inputs").val().indexOf("data.gov") != -1) {
	    localStorage.appurl = $("#url_inputs").val();
	    ckanrequest.loadingMsg("Saved "+localStorage.appurl, 3000);
	    $.mobile.changePage("#page_search", "slide", true, false);  
	  }else {
	    ckanrequest.loadingMsg("Please use Url from Valid Ckan Hub", 3000);
	  }
	  
	}else { 
	  if($(".chosen-single span").html() != "Select URL" ) {
	    
	    var url = $(".chosen-single span").html();
	    switch(url) {
          case 'UGANDA': 
            localStorage.appurl = "http://catalog.data.ug";  
            break;
          case 'UK':
            localStorage.appurl = "http://data.gov.uk";
            break;
          case 'USA':
            localStorage.appurl = "http://catalog.data.gov";
            break;
           
          default :
            break
          }
          ckanrequest.loadingMsg("Saved "+localStorage.appurl, 3000);
	  $.mobile.changePage("#page_search", "slide", true, false);
	  }else{
	    ckanrequest.loadingMsg("Select a URL", 3000);
	  }
	
	}
	
	
      });
      
      $("#search_tags").keyup(function (e) {
      //listen for enter key
      if (e.keyCode == 13) {
        controller.loadList();
	
      }
      });
      
      $("#start_search").bind('click', function() {
        
	//TODO use web apis to check for internet
	//ckanrequest.checkOnline().then(function(){

          if($("#search_tags").val().length > 0) {
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
