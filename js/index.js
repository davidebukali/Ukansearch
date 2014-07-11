/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
      document.addEventListener('deviceready', this.onDeviceReady, false);

      $("#start_search").bind('click', function(){
        ckanrequest.checkOnline().then(function(){

          if($("#search_tags").val().length > 0){
            var ckanlist =  $("#searchresults");
            ckanlist.empty();
            
            ckanrequest.loadingMsg("Please wait ... ", 0);
            
            ckanrequest.getTagname().then(function(data){
              $.unblockUI();
              if(data['result']['results'].length > 0){
                for(var x in data['result']['results']) {

                  for(var y in data['result']['results'][x]['resources']){
                    if(data['result']['results'][x]['resources'] != undefined){
                      var li = $("<li></li>");
                      var a = $("<a href='#' id='' onclick=''></a>");
                      var h1 = $("<h1 class='heada1' style='white-space:normal;'>" + data['result']['results'][x]['resources'][y]['name'] + "</h1>");
                      var p = $("<p class='para1'>Format: " + data['result']['results'][x]['resources'][y]['format'] + "</p>");

                      a.append(h1);
                      a.append(p);
                      li.append(a);
                      ckanlist.append(li);

                    }  
                  }

                }
                ckanlist.listview().listview('refresh');
                $.mobile.changePage("#page_search_results", "slide", true, false);
              }else{
                ckanrequest.loadingMsg("No results for "+$("#search_tags").val(), 0);
              }

            });  
          }else{
            ckanrequest.loadingMsg("Enter Tags to Search", 3000);
          }

        }).fail(function(){

          ckanrequest.loadingMsg("Please connect to the internet to Search for Datasets", 3000);
        });
        
      });

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

      console.log('Received Event: ' + id);
    }
};
