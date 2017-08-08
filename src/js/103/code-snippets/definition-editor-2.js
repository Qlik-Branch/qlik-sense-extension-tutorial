export default
`var myDefinition = {
    type: "items",
    component: "accordion",
    items: {
        dimensions: {
            uses: "dimensions",
            min: 1,
            max: 5
        },
        measures: {
            uses: "measures",
            min: 0,
            max: 5
        },
        sorting : {
            uses: "sorting"
        },
        settings: {
            uses: "settings"
        }
    }
}`