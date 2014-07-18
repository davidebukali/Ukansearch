var ckanrequest = {
    getTagname: function(q) {
        var d = $.Deferred();
        var pack = {
            "rows": 10,
            "q": q
        };

        console.log("using " + localStorage.appurl);

        $.ajax({
            url: localStorage.appurl + "/api/3/action/package_search",
            type: "post",
            dataType: 'json',
            data: JSON.stringify(pack),
            error: function(jqXHR, textStatus, errorThrown) {
                d.reject();
            },
            success: function(results) {
                d.resolve(results);
            }
        });

        return d;
    },

    checkUrl: function() {
        var d = $.Deferred();

        $.ajax({
            url: localStorage.appurl + "/api/3",
            type: "get",
            error: function(jqXHR, textStatus, errorThrown) {
                d.reject();
            },
            success: function(results) {
                d.resolve(results);
            }
        });

        return d;
    },

    //phonegap onOnline event handler
    checkOnline: function() {
        var d = $.Deferred();
        return d;

        // TODO figure how try catch works
        try {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';
        } catch (err) {
            return d;
        }

        if ((states[networkState] == 'No network connection') ||
                (states[networkState] == 'Unknown connection')) {
            d.reject();
        } else {
            d.resolve();
        }
        return d;
    },

    //message to the user about current running process
    loadingMsg: function(msg, t) {
        $.blockUI({
            message: msg,
            fadeIn: 700,
            fadeOut: 700,
            timeout: t,

            css: {
                width: '250px',
                top: ($(window).height()) / 2 + 'px',
                left: ($(window).width() - 225) / 2 + 'px',
                right: '10px',
                border: 'none',
                padding: '5px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: 0.8,
                color: '#fff'
            }
        });
    }
}
