function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
//TODO: Filter to just the written tweets
	textArray = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	for(var i = 0; i < textArray.length; i++){
		rowArray.push(textArray[i].getHTMLTableRow(i));
	}
}
var x = loadSavedRunkeeperTweets();
var textArray =[];
var rowArray = [];
function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	var input = document.getElementById("textFilter");
	var table = document.getElementById("tweetTable");

	input.onkeypress = function(){
		$("#tweetTable").empty();
		var searchArr = [];
		if(input.value != ""){
			for(var i = 0; i < textArray.length; i++){
				if(textArray[i].text.includes(input.value)==true){
					searchArr.push(rowArray[i]);
				}
			}
			var row = [];
			$("#searchCount").text(searchArr.length);
			$("#searchText").text(input.value);
			for(var i = 0; i < searchArr.length; i++){
				var num = "<tr><td>" + (i+1) + "</td>";
				$("#tweetTable").append(num.concat(searchArr[i]));
				//document.getElementById("tweetTable").innerHTML = searchArr[i];
			}
		}
	}


}

//Wait for the DOM to load
$(document).ready(function() {
	
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
	$("#liveButton").on("click", function(){
	var $this = $(this);
	if($this.text() == "Switch to live tweets"){
		loadLiveRunkeeperTweets().then(parseTweets);
		//$("#liveButton").text("Switch to saved tweets");
		//location.reload();
	}
	else{
		//fetch("twitter_proxy_config.json/1.1/search/tweets.json?q=#RunKeeper&lang-en")
		loadSavedRunkeeperTweets().then(parseTweets);
		
		//$("#liveButton").text("Switch to live tweets");
	}
	});
});