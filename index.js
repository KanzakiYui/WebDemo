const Express =require("express");

var app = Express();

const ClientFileDirectory =  __dirname + '/client';

app.get('/', function (request, response, next) {
  	var options = {
    	root: ClientFileDirectory,
    	headers: {
			'Content-Type': 'text/html',
    	}
  	};
	response.sendFile("index.html", options, function (error) {
    	if (error) next(error)
  	});
});

//	------------------------------			index					-------------------//
app.get('/:name', function (request, response, next) {
	var filename = request.params.name;
	var filetype= filename.split(".").pop();
	if(filetype==="css") filetype="text/css";
	else if(filetype==="js") filetype="application/x-javascript";
	else if(filetype==="svg") filetype="text/xml";
	var options = {
    	root: ClientFileDirectory,
    	headers: { 'Content-Type': filetype }
  	};
	response.sendFile(filename, options, function (error) {
    	if (error) next(error)
  	});
});

//	------------------------------			Example1					-------------------//
app.get('/PatientCard/:name', function (request, response, next) {
	var filename = request.params.name;
	var filetype= filename.split(".").pop();
	if(filetype==="css") filetype="text/css";
	else if(filetype==="js") filetype="application/x-javascript";
	else if(filetype==="svg") filetype="text/xml";
	var options = {
    	root: ClientFileDirectory+"/PatientCard",
    	headers: { 'Content-Type': filetype }
  	};
	response.sendFile(filename, options, function (error) {
    	if (error) next(error)
  	});
});

app.get('/PatientCard/css/:name', function (request, response, next) {
	var options = {
    	root: ClientFileDirectory+"/PatientCard/css",
    	headers: {
			'Content-Type': 'text/css',
    	}
  	};
	response.sendFile(request.params.name, options, function (error) {
    	if (error) next(error)
  	});
});

app.get('/PatientCard/js/:name', function (request, response, next) {
	var options = {
    	root: ClientFileDirectory+"/PatientCard/js",
    	headers: {
			'Content-Type': 'application/x-javascript',
    	}
  	};
	response.sendFile(request.params.name, options, function (error) {
    	if (error) next(error)
  	});
});

app.get('/PatientCard/img/:name', function (request, response, next) {
	var options = {
    	root: ClientFileDirectory+"/PatientCard/img",
    	headers: {
			'Content-Type': 'image/jpeg',
    	}
  	};
	response.sendFile(request.params.name, options, function (error) {
    	if (error) next(error)
  	});
});

//	------------------------------			Example2					-------------------//
app.get('/GomokuGame/:name', function (request, response, next) {
	var filename = request.params.name;
	var filetype= filename.split(".").pop();
	if(filetype==="css") filetype="text/css";
	else if(filetype==="js") filetype="application/x-javascript";
	var options = {
    	root: ClientFileDirectory+"/GomokuGame",
    	headers: { 'Content-Type': filetype }
  	};
	response.sendFile(filename, options, function (error) {
    	if (error) next(error)
  	});
});

app.get('/GomokuGame/static/css/:name', function (request, response, next) {
	var options = {
    	root: ClientFileDirectory+"/GomokuGame/static/css",
    	headers: {
			'Content-Type': 'text/css',
    	}
  	};
	response.sendFile(request.params.name, options, function (error) {
    	if (error) next(error)
  	});
});

app.get('/GomokuGame/static/js/:name', function (request, response, next) {
	var options = {
    	root: ClientFileDirectory+"/GomokuGame/static/js",
    	headers: {
			'Content-Type': 'application/x-javascript',
    	}
  	};
	response.sendFile(request.params.name, options, function (error) {
    	if (error) next(error)
  	});
});



app.listen(process.env.PORT || 8080);