var exec = require('child_process').exec;

function start(response) {
  console.log('Request handler "start" was called.')
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

  return content;
}

function upload(response) {
  console.log('Request handler "upload" was called.')
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello upload');
  response.end();
}

function submitForm(response) {
  console.log('Request handler "submitForm" was called.')
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello submitForm');
  response.end();
}

exports.start = start;
exports.upload = upload;
exports.submitForm = submitForm;
