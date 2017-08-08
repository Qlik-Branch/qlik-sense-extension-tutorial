export default
`var pageDefs = [
	{
		qTop: 0,
		qLeft: 0,
		qWidth: 5,
		qHeight: 1000
	},
	{
		qTop: 1000,
		qLeft: 0,
		qWidth: 5,
		qHeight: 1000
	},
	{
		qTop: 2000,
		qLeft: 0,
		qWidth: 5,
		qHeight: 500
	}
];


var pagesPr = pageDefs.reduce(function(prev, curr) {
	// Return a new promise
	return new Promise(function(resolve, reject) {
		// When the previous promise is done
		prev.then(function(accPages) {
			// Get the new page
			backendApi.getData(curr).then(function(newPage) {
				// Add the latest page to the accumulated array of pages and resolve the promise with that accumulated array
				accPages.push(newPage);
				resolve(accPages);
			})
		})
	});
	
}, Promise.resolve([]));

pagesPr.then(function(pages) {
	// do something with the pages
})`