export default
`define( ["./initialProperties", "text!./style.css"], function (myProps, cssText) {
	// ...
	var myProps = {
		textColor: "black",
		qHyperCubeDef: {
			qDimensions: [],
			qMeasures: [],
			qInitialDataFetch: [
				{
					qTop: 0,
					qLeft: 0,
					qWidth: 10,
					qHeight: 1000
				}
			]
		}
	};
	// ...
})`