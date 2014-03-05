function loadHome(){
	$("#copymysql").click(function(){
		$.anycook.graph.backend.copyMySql(function(response){
		if(response) alert("copied mysqldb");
		else alert("copy mysqldb failed");
		})
	});
}


// behandelt change bei $.address.path
function handleChange(event){
	$("#content").empty();

	var path = event.pathNames;

	$.xml.append(path[0], function(){
		switch(path.length){
		case 0:
			loadHome();
			break;
		case 1:
			switch(path[0]){
			case "recipes":
				$.anycook.backend.recipes.load();
				break;
			}
			break;
		}
	});
};