export function parse_container_list () {
    var data;

    Papa.parse('/src/files/mars_container_list.csv', {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function(results) {
        console.log(results);
        data = results.data;
    }
    });
}