var querystring = require('querystring');
var exec = require('child_process').exec;

function start(response) {
  console.log('Request handler "start" was called.')
  var body='<html>' +
  '<head>' +
  '<meta charset=UTF-8/>' +
  '</head>' +
  '<body>' +
  '<form action="/upload" method="post">' +
  '<textarea name="text" rows="20" cols="70"></textarea><br>' +
  '<input type="submit" value="Submit text" />' +
  '</form>' +
  '</body>' +
  '</html>'

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log('Request handler "upload" was called.')
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('You have sent the text: ' + querystring.parse(postData).text);
  response.end();
}

function submitForm(response) {
  console.log('Request handler "submitForm" was called.')
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello submitForm');
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
