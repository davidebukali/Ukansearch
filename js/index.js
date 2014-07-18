var app = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //clear textfield on select click
        $("#urlselect").bind('click', function(e) {
            if ($(this).val() == "custom") {
                $("#url_inputs").show();
            } else {
                $("#url_inputs").hide();
            }
        });

        //event to handle urls save
        $("#set_url").bind('click', function(e) {
            if ($("#url_inputs").val().length > 0) {
                localStorage.appurl = $("#url_inputs").val();
                ckanrequest.loadingMsg("Saved " + localStorage.appurl, 3000);
                $.mobile.changePage("#page_search", "slide", true, false);
            } else {
                if ($("#urlselect").val() != "select" && $("#urlselect").val() != "custom") {
                    var url = $("#urlselect").val();
                    switch (url) {
                        case 'ug':
                            localStorage.appurl = "http://catalog.data.ug";
                            ckanrequest.loadingMsg("Saved UGANDA " + localStorage.appurl, 3000);
                            break;

                        case 'uk':
                            localStorage.appurl = "http://data.gov.uk";
                            ckanrequest.loadingMsg("Saved UK " + localStorage.appurl, 3000);
                            break;

                        case 'usa':
                            localStorage.appurl = "http://catalog.data.gov";
                            ckanrequest.loadingMsg("Saved USA " + localStorage.appurl, 3000);
                            break;
                    }

                    $.mobile.changePage("#page_search", "slide", true, false);
                } else {
                    ckanrequest.loadingMsg("Select a URL", 3000);
                }
            }
        });

        $("#search_tags").keyup(function(e) {
            //listen for enter key
            if (e.keyCode == 13) {
                ckanrequest.loadingMsg("Please wait ... ", 0);
                ckanrequest.checkUrl()
                    .then(function(result) {
                        if (result['version'] != undefined && result['version'] != null) {
                            controller.loadList();
                        }
                    })
                    .fail(function() {
                        ckanrequest.loadingMsg("Invalid URL", 3000);
                    });
            }
        });

        $("#start_search").bind('click', function() {
            ckanrequest.loadingMsg("Please wait ... ", 0);
            // TODO use web apis to check for internet
            // ckanrequest.checkOnline().then(function(){

            if ($("#search_tags").val().length > 0) {
                ckanrequest.checkUrl()
                    .then(function(result) {
                        if (result['version'] != undefined && result['version'] != null) {
                            controller.loadList();
                        }
                    })
                    .fail(function() {
                        ckanrequest.loadingMsg("Invalid URL", 3000);
                    });

            } else {
                ckanrequest.loadingMsg("Enter Tags to Search", 3000);
            }

            //TODO catch no internet using web apis.
            //}).fail(function(){

            //ckanrequest.loadingMsg("Please connect to the internet to Search for Datasets", 3000);
            //});
        });
    }
};
