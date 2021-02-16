//initialize function called when the script loads
function initialize(){
    cities();
    //debugAjax when page loads
	debugAjax();
};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
		{ 
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

	//append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");
	
	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");
	
	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };

    addColumns(cityPop);
    addEvents();
};
//function to create new column  
function addColumns(cityPop){
    //calls each row element based on function
    $('tr').each(function(i){

    	if (i == 0){
			// If i = 0 appends this to city size
    		$(this).append('<th>City Size</th>');
    	} else {
			// If not places in citysize variable
    		var citySize;
			// Labels cities based on population. 
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
			//Adds city size if applicable
    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};
// Add events function called
function addEvents(){
	//Mouse over function created, callable
	$('#table').mouseover(() => {
		
		var color = "rgb(";
		//Loop to determine style of table and size of clickable area.  
		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);
			//Styling
			color += "random";

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
			}
		};

		$(this).css('color', color);
	});
	//Creates message if area clicked
	function clickme(){

		alert('Hey, you clicked me!');
	};

	$('table').on('click', clickme);
};

//call the initialize function when the document has loaded
$(document).ready(initialize);
// creates callback function that prints GeoJSON data on tha page
function debugCallback(mydata){
	
	$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};
// Creates fucntion that prints data on web page  
function debugAjax(){
	//declares variable 
	var mydata;
    //calls geojson data
	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: function(response){
            //sets variable equal to fucntion response 
            mydata = response
            //calls callback function 
			debugCallback(mydata);
		}
	});
};

