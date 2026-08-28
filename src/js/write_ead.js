

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

// RETURN THE STRING HAVING TO DO WITH FRONT MATTER FROM HERE
function process_front_matter() {
    let front_matter = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><ead><eadheader langencoding=\"ISO_639-2b\" scriptencoding=\"iso15924\" relatedencoding=\"dc\" repositoryencoding=\"iso15511\" countryencoding=\"iso3166-1\" dateencoding=\"iso8601\"><eadid countrycode=\"us\" mainagencycode=\"";

    //Add agency code and publicid
    front_matter = front_matter + document.getElementById("repo_code").value + "\" encodinganalog=\"identifier\" publicid=\"-//" + document.getElementById("repo_name").value + "//text(us::" + document.getElementById("repo_code").value + ":://EN\">"

    // Add filename
    front_matter = front_matter + document.getElementById("guide_filetitle").value + "</eadid>"

    
      console.log(front_matter)
      
}

function process_container_list(results) {
    // Fix this up some
    //document.getElementById("content").innerHTML = "";
    //console.log(results.data);
    //let success = document.createTextNode("WOOHOO");
    //document.getElementById('content').appendChild(success);

    // MAYBE FARM OUT FRONT MATTER PROCESSING HERE??
    process_front_matter();


    // Add first portion of the container list
    let container_list = "<dsc>"

    // Variables to indicate presence of series
    let series = "";

    // Check for series and group by series if present
    if (results.data[0].Series.length === 0 || /^\s*$/.test(results.data[0].Series)) {
        console.log("NO SERIES")
    }

    else {
        series = Object.groupBy(results.data, ({ Series }) => Series);
        // ADD A SUBSERIES CHECK HERE
        // POSSIBLY YOU CAN DO THIS WITH WHILE AND RUN THROUGH VARIOUS SUBSERIES UNTIL YOU HIT SOMETHING THAT'S A BOX

        // Isolate series names
        var keys = Object.keys(series);

        // Append each series to the xml and process the box and folder list
        for (let i = 0; i < keys.length; i++) {
            //console.log(keys[i])

            // Append series name to XML and add necessary tags
            let series_name = keys[i];
            container_list = container_list + "<c01><did><unittitle>" + series_name + "</unittitle></did>"

            // Add boxes and folders
            box_folder(series[series_name]);

            // Close out c01 after all boxes have been added
            container_list = container_list + "</c01>"
        }

        // Close out dsc after container list is complete
        container_list = container_list + "</dsc>" 
        //console.log(container_list)
    }
    

    
    //then group subseries

    //then work through the boxes and folders

}

// NEEDS TO RETURN THE BOX AND FOLDER LIST SO YOU CAN TACK IT ONTO THE CONTAINER LIST
function box_folder (item_array) {
    console.log("HIT")
    
    console.log(item_array)
}

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