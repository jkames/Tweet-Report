function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
//TODO: Filter to just the written tweets
}
var x = loadSavedRunkeeperTweets();
var textArray =[];
x.then(function(fromResolve){
	for(var i = 0; i < fromResolve.length; i++){
		textArray.push(fromResolve[i].text);
	}
});
function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	var input = document.getElementById("textFilter");
	var table = document.getElementById("tweetTable");

	input.onkeypress = function(){
		$("#tweetTable").empty();
		var searchArr = [];
		if(input.value != ""){
			for(var i = 0; i < textArray.length; i++){
				if(textArray[i].includes(input.value)==true){
					searchArr.push(textArray[i]);
				}
			}
			var row = [];
			var cell = [];
			for(var i =0; i < searchArr.length; i++){
				row[i] = table.insertRow(i);
				for(var j = 0; j < 3; j++){
					cell[i+j*3] = row[i].insertCell(j);
				}
			}
			$("#searchCount").text(searchArr.length);
			for(var i = 0; i < searchArr.length; i++){
				//document.getElementById("tweetTable").innerHTML = searchArr[i];
			}
		}
	}


}

//Wait for the DOM to load
$(document).ready(function() {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});