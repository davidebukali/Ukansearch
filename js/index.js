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

      //clear textfield on select click
      $("#urlselect").bind('click', function(e) {
        $("#url_inputs").val("");

      });

      $("#start_search").bind('click', function() {
        
        ckanrequest.checkOnline().then(function(){

        if($("#search_tags").val().length > 0) {
          controller.loadList();  

        }else{
          ckanrequest.loadingMsg("Enter Tags to Search", 3000);
        }

        }).fail(function(){

        ckanrequest.loadingMsg("Please connect to the internet to Search for Datasets", 3000);
        });

      });

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
          if($("#urlselect").val() != "select" ) {

            var url = $("#urlselect").val();
            switch(url) {
            case 'ug': 
              localStorage.appurl = "http://catalog.data.ug";  
              ckanrequest.loadingMsg("Saved UGANDA "+localStorage.appurl, 3000);
              break;
            
            case 'uk':
              localStorage.appurl = "http://data.gov.uk";
              ckanrequest.loadingMsg("Saved UK "+localStorage.appurl, 3000);
              break;
            case 'usa':
              localStorage.appurl = "http://catalog.data.gov";
              ckanrequest.loadingMsg("Saved USA "+localStorage.appurl, 3000);
              break;

            default :
              break
            }

            $.mobile.changePage("#page_search", "slide", true, false);
          }else{
            ckanrequest.loadingMsg("Select a URL", 3000);
          }

        }


      });

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      //app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

      //console.log('Received Event: ' + id);
    }
};
