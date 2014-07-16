var controller = {

loadList: function(){
var ckanlist =  $("#searchresults");
            ckanlist.empty();
            
            ckanrequest.getTagname($("#search_tags").val()).then(function(data){
              $.unblockUI();
              if(data['result']['results'].length > 0){
                for(var x in data['result']['results']) {

                  var li = $("<li></li>");
                  var a = $("<a href='#' id='' onclick=''></a>");
                  var h1 = $("<h1 class='heada1' style='white-space:normal;'>" + data['result']['results'][x]['title'] + "</h1>");
                  
                  if(data['result']['results'][x]['notes'] == null){
                    var p0 = $("<p class='para' style='white-space:normal;'></p>");
                  }else{
                    var p0 = $("<p class='para' style='white-space:normal;'>" + data['result']['results'][x]['notes'] + "</p>");  
                  }
                  
                  a.append(h1);
                  a.append(p0);

                  li.append(a);
                  ckanlist.append(li);

                }
                ckanlist.listview().listview('refresh');
                
              }else{
                ckanrequest.loadingMsg("No results for "+$("#search_tags").val(), 3000);
              }

            });  
}

}