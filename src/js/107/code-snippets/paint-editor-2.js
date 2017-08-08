export default
`function($element, layout) {
	// Create a new promise and return it
	return new Promise(function(resolve, reject) {
		// Do an asynchronous call to some URL for text
		var getText = fetch("my-url");
		getText.then(function(text) {
			// When that async call comes back, render the text response to the element and resolve our promise to signify that we are done with rendering
			$element.html(text);
			resolve();
		});
}`