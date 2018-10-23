function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var arrAct = [];
	for(var i = 0; i < tweet_array.length; i++){
		arrAct.push(tweet_array[i].activityType);
	}
	function onlyUnique(array){
	var result = Array.from(new Set(array));
	return result;
	}
	var counts = {};
	for (var i = 0; i < tweet_array.length; i++) {
		counts[tweet_array[i].activityType] = 1 + (counts[tweet_array[i].activityType] || 0);
	}
	var uniqueArr = onlyUnique(arrAct);

	var dictArray = [];
	for(var i = 0; i < uniqueArr.length; i++){
		dictArray[i] = {activity: uniqueArr[i], numberOfTweets:counts[uniqueArr[i]]};
	}

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": dictArray
		},
		"mark": "bar",
		"encoding":{
			"x": {"field": "activity", "type": "ordinal",
				"sort":{"op": "count", "field": "activity"}
		},
			"y": {"field": "numberOfTweets", "type": "quantitative"}
		}
	};
	var popularActivityArr = [];
	for(var i = 0; i < tweet_array.length; i++){
		if(tweet_array[i].activityType == "run" || tweet_array[i].activityType == "walk" || tweet_array[i].activityType == "bike"){
			popularActivityArr.push(tweet_array[i]);
		}
	}
	var distanceArr = [];
	for(var i = 0; i < popularActivityArr.length; i++){
		var str = String(popularActivityArr[i].time);
		var day = str.slice(0,3);
		distanceArr[i] = {days: day, distance: popularActivityArr[i].distance, activity: popularActivityArr[i].activityType};
	}
	distanceByDay = {
		"$schema": "https://vega.github.io/schema/vega-lite/v2.json",
		"description": "A plot of the distances by day of the week for 3 mosted tweeted activity",
		"data": {
			"values": distanceArr
		},
		"mark": "point",
		"encoding": {
		  "x": {"field": "days", "type": "ordinal", "sort": ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},
		  "y": {"field": "distance", "type": "quantitative"},
		  "color": {"field": "activity", "type": "nominal"}
		}
	};
	aggregatedDistance = {
		"$schema": "https://vega.github.io/schema/vega-lite/v2.json",
		"description": "A plot of the distances by day of the week for 3 mosted tweeted activity",
		"data": {
			"values": distanceArr
		},
		"mark": "point",
		"encoding": {
		  "x": {"field": "days", "type": "ordinal", "sort": ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},
		  "y": {"aggregate": "mean", "field": "distance", "type": "quantitative"},
		  "color": {"field": "activity", "type": "nominal"}
		}
	};

	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});
	vegaEmbed('#distanceVis', distanceByDay, {actions:false});
	vegaEmbed('#distanceVisAggregated', aggregatedDistance, {actions:false});
	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	$("#numberActivities").text(uniqueArr.length-1);
	$("#firstMost").text("run");
	$("#secondMost").text("walk");
	$("#thirdMost").text("bike");
	$("#distanceVisAggregated").hide();
	$("#aggregate").on("click", function(){
		var $this = $(this);
		if($this.text() === "Show means"){
			$("#distanceVis").hide();
			$("#distanceVisAggregated").show();
			$("#aggregate").text("Show all activities");
		}
		else{
			$("#distanceVis").show();
			$("#distanceVisAggregated").hide();
			$("#aggregate").text("Show means");
		}
	});
	$("#longestActivityType").text("bike");
	$("#shortestActivityType").text("walk");
	$("#weekdayOrWeekendLonger").text("weekends");
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});