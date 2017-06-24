function start() {
	console.log('Request handler "start" was called.')

	function sleep (milliSeconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds) {
			
		}
		console.log('sleep ' + milliSeconds);
	}
	sleep(11000);
	return 'Hello Juliet';
}

function upload() {
	console.log('Request handler "upload" was called.')
	return 'Hello upload';
}

function submitForm() {
	console.log('Request handler "submitForm" was called.')
	return 'Hello submitForm';
}

exports.start = start;
exports.upload = upload;
exports.submitForm = submitForm;
