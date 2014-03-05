var LoginView = Backbone.View.extend({
	id : "login",
	events : {
		"submit #loginForm"  : "login"
	},
	initialize : function(){
		var $el = this.$el;
		$.get("/templates/loginView.erb?"+Math.random(), function(text){
			var template = _.template(text);
			$el.html(template);
		});
		$("#content").empty().append(this.$el);
	},
	login : function(event){
		event.preventDefault();
		var loginCredentials = {
			username : this.$("#username").val(),
			password : this.$("#password").val(),
			stayLoggedIn : false	
		}
		
		$.anycook.api.backend._postJSON("session/login", loginCredentials, function(response){
			$.when(User.init()).then(function(userdata){
		        user = userdata;
		        if(user.checkLogin())
		          $("#user a").attr("href", "http://test.anycook.de/"+user.getProfileURI()).text(user.name);
		      
		         //initialize routers
		        Backbone.history.navigate("", true);
		      });
			
		});
	}

});