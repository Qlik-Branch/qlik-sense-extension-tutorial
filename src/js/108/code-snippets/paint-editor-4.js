export default
`...
// Make the element scroll
$element.css("overflow-y","auto");

// Number of pages calculation
var pageSize = 1000;
var totalRows = layout.qHyperCube.qSize.qcy;
var numberOfPages = Math.ceil(totalRows/pageSize);

// Function for creating a page fetcher function based on page number
var fetchPage = function(pageNumber) {
    return function(evt) {
        var page = backendApi.getData([{
            qTop: pageNumber*pageSize,
            qLeft: 0,
            qWidth: 10,
            qHeight: pageSize
        }]);

        page.then(function(data) {
            render(data[0].qMatrix);
        });

        // reset background-color of all buttons
        $element.find("button").css("background-color","");

        // set clicked button background color
        evt.target.style.backgroundColor = "deepskyblue";
    }
}

// Create a page label
var pageSpan = document.createElement("span");
pageSpan.innerHTML = "Page ";
$element.append(pageSpan);

// Create a button for each page
for(var i = 0; i<numberOfPages; i++) {
    var button = document.createElement("button");
    button.innerHTML = (i+1);
    button.addEventListener("click", fetchPage(i));
    // On init, color the first button
    if (i === 0) button.className = "active-pg";
    $element.append(button);
}


// Create a table
var table = document.createElement("table");
...`