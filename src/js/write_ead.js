

// DON'T NEED TO EXPORT THESE
function error_handling (errors) {
    document.getElementById("content").innerHTML = "";

    // Create Heading
    const heading = document.createElement("h1");
    const headingText = document.createTextNode("ERRORS");
    heading.append(headingText)
    document.getElementById('content').appendChild(heading);

    // Indicate that errors were found
    const intro = document.createElement("p");
    const insert = "Bummer! Your spreadsheet contains " + errors.length + " errors:";
    const introText = document.createTextNode(insert);
    intro.append(introText);
    document.getElementById('content').appendChild(intro);

    // Add table and populate
    const error_enum = document.createElement("table");

    for (let i = 0; i < errors.length; i++) {
        let td_1 = document.createElement("td");
        let td_2 = document.createElement("td");
        let tr = document.createElement("tr");
        let message = document.createTextNode(errors[i].message);
        let rowNum = document.createTextNode(i);
        td_1.appendChild(rowNum);
        td_1.appendChild(message);
        tr.appendChild(td_1);
        tr.appendChild(td_2);
        error_enum.appendChild(tr);
    }

    document.getElementById('content').appendChild(error_enum);

    // Add button that will reload the page when the errors aren't needed anymore
    //TODO create some errors on purpose to test
}

function process_container_list(results) {
    // Fix this up some
    document.getElementById("content").innerHTML = "";
    //console.log(results.data);
    let success = document.createTextNode("WOOHOO");
    document.getElementById('content').appendChild(success);

    // MAYBE FARM OUT FRONT MATTER PROCESSING HERE??

    // Variables to indicate presence of series
    // Add opening dsc to the container list
    let container_list = "<dsc>"
    let series = "";

    // Check for series and group by series if present
    if (results.data[0].Series.length === 0 || /^\s*$/.test(results.data[0].Series)) {
        console.log("NO SERIES")
    }

    else {
        series = Object.groupBy(results.data, ({ Series }) => Series);
        // ADD A SUBSERIES CHECK HERE

        var keys = Object.keys(series);


        for (let i = 0; i < keys.length; i++) {
            console.log(keys[i])
            let series_name = keys[i];
            console.log(series[series_name])
        }


        
    }
    

    
    //then group subseries

    //then work through the boxes and folders

}

function box_folder () {}

// DO NEED TO EXPORT THESE
export function parse_container_list () {
    Papa.parse('/src/files/mars_container_list.csv', {
    header: true,
    delimiter: ",",
    download: true,
    dynamicTyping: true,
    complete: function(results) {

        // If there are errors, enumerate them
        if (results.errors.length > 0) {
            error_handling (results.errors);
        }
        
        // Otherwise, process the file
        else {
            process_container_list(results)
        }
    }
    });
}