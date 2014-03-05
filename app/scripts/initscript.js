$(document).ready(function($) {
	$.ajaxSetup({
    	global:true,
        scriptCharset: "utf8" ,
        contentType: "application/x-www-form-urlencoded; charset=utf8"
    });

    $.when($.anycook.api.init({appid:1, baseUrl: "http://10.1.0.200"})).then(function(){
    	$.when(User.init()).then(function(userdata){
        user = userdata;
        if(user.checkLogin())
          $("#user a").attr("href", "http://anycook.de/"+user.getProfileURI()).text(user.name);

         //initialize routers
        new Backend();
        Backbone.history.start({pushState: true});
      });
    });



    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router.  If the link has a data-bypass
    // attribute, bypass the delegation completely.
    $(document).on("click", "a:not([data-bypass])", function(evt) {
        // Get the anchor href and protcol
        var href = $(this).attr("href");
        var protocol = this.protocol + "//";

        // Ensure the protocol is not part of URL, meaning its relative.
        if (href && href.slice(0, protocol.length) !== protocol &&
            href.indexOf("javascript:") !== 0) {
          // Stop the default event to ensure the link will not cause a page
          // refresh.
          evt.preventDefault();

          // `Backbone.history.navigate` is sufficient for all Routers and will
          // trigger the correct events.  The Router's internal `navigate` method
          // calls this anyways.
          Backbone.history.navigate(href, true);
        }
    });

});

var user = null;
