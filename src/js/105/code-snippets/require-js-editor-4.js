export default
`define(["text!./style.css"], function(cssText) {
	// Create a style element
	var style = document.createElement("style");
	// Set the style element content
	style.innerHTML = cssText;
	// Add the style to the header of the page
	document.querySelector("head").appendChild(style);
}`