export default
`var pagePromises = [
	backendApi.getData({qTop: 0, qLeft: 0, qWidth: 5, qHeight: 1000}),
	backendApi.getData({qTop: 1000, qLeft: 0, qWidth: 5, qHeight: 1000}),
	backendApi.getData({qTop: 2000, qLeft: 0, qWidth: 5, qHeight: 1000})
];

Promise.all(pagePromises).then(function(pages) {
	// do something with the array of pages, like render a chart
})`