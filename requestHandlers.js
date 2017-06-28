var querystring = require('querystring');
var fs = require('fs')
var formidable = require('formidable');
var exec = require('child_process').exec;

function start(response) {
  console.log('Request handler "start" was called.')
  var body='<html>' +
  '<head>' +
  '<meta charset=UTF-8/>' +
  '</head>' +
  '<body>' +
  '<form action="/submitForm" method="post">' +
  '<textarea name="text" rows="20" cols="70"></textarea><br>' +
  '<input type="submit" value="Submit text" />' +
  '</form>' +
  '<form action="/upload" enctype="multipart/form-data" method="post">' +
  '<input type="file" name="upload"><br>' +
  '<input type="submit" value="Upload file" />' +
  '</form>' +
  '<img id="charliePhoto" src="show" alt="Smiley face">' +
  '</body>' +
  '</html>'

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(body);
    response.end();
}

function upload(response, postData, request) {
  console.log('Request handler "upload" was called.')

 	console.log(postData);

  var form = new formidable.IncomingForm();
  console.log('about to parse form');
  form.parse(request, function (error, fields, files) {
  	console.log('parsing done. file: ' + files);
  	var strFile = JSON.stringify(files);
  	console.log(strFile);
  	//fs.renameSync(files.upload.path, "e:\\movie\\test.jpg");
  	fs.renameSync(files.upload.path, "C:\\Users\\DATAB_~1\\AppData\\Local\\Temp\\test.jpg");
  });

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('received image: <br>');
  response.write('<img src="/show" />');
  response.end();
}

function show(response, postData) {
  console.log('Request handler "show" was called.');
  fs.readFile("C:\\Users\\DATAB_~1\\AppData\\Local\\Temp\\test.jpg", "binary", function(error, file) {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "image/png" });
      response.write(file, "binary");
      response.end();
    }
  });
}

function submitForm(response, postData) {
  console.log('Request handler "upload" was called.')
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('You have sent the text: ' + querystring.parse(postData).text);
  response.end();
}

function osDir(response) {
  console.log('Request handler "osDir" was called.')
  var content = 'empty';

  // ls -lah = dir on DOS,
  exec('dir', {timeout: 10000, maxBuffer: 20000 * 1024}, function(error, stdout, stderr) {
    content = stdout;
    console.log(content);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(stdout);
    response.end();
    console.log('ls -lah');
  })

}



exports.start = start;
exports.upload = upload;
exports.submitForm = submitForm;
exports.show = show;
