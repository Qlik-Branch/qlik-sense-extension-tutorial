export default
`define([], function() {
	var myProps = {
		textColor: "black"
	};

	var myDefinition = {
		type: "items",
		component: "accordion",
		items: {
			settings: {
				uses: "settings"
			}
		}
	};

	return {
		initialProperties: myProps,
		definition: myDefinition
	};
});`