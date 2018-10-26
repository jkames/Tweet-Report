function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var compCount = 0;
	for(var i = 0; i < tweet_array.length; i++){
		if(tweet_array[i].source == "completed_event"){
			compCount = compCount + 1;
		}
	}

	var liveCount = 0;
	for(var i = 0; i < tweet_array.length; i++){
		if(tweet_array[i].source == "live_event"){
			liveCount = liveCount + 1;
		}
	}

	var achCount = 0;
	for(var i =0; i < tweet_array.length; i++){
		if(tweet_array[i].source == "achievement"){
			achCount = achCount + 1;
		}
	}

	var misCount = 0;
	for(var i =0; i < tweet_array.length; i++){
		if(tweet_array[i].source == "miscellaneous"){
			misCount = misCount+1;
		}
	}

	var writtenCount = 0;
	for(var i =0; i < tweet_array.length; i++){
		if(tweet_array[i].written ==  true){
			writtenCount = writtenCount + 1;
		}
	}
	$('#numberTweets').text(tweet_array.length);

	$("#firstDate").text(tweet_array[tweet_array.length-1].time.toLocaleDateString('en-Us',{weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'}));
	$("#lastDate").text(tweet_array[0].time.toLocaleDateString('en-US',{weekday:'long', month:'long', day:'numeric', year:'numeric'}));
	$(".completedEvents").text(compCount); 
	$(".completedEventsPct").text(math.format((compCount*100)/tweet_array.length,{notation: 'fixed', precision: 2})+"%");
	$(".liveEvents").text(liveCount)
	$(".liveEventsPct").text(math.format((liveCount*100)/tweet_array.length,{notation: 'fixed', precision: 2})+"%");
	$(".achievements").text(achCount);
	$(".achievementsPct").text(math.format((achCount*100)/tweet_array.length,{notation: 'fixed', precision: 2})+"%"
	);
	$(".miscellaneous").text(misCount);
	$(".miscellaneousPct").text(math.format((misCount*100)/tweet_array.length,{notation:'fixed',precision:2})+"%");
	$(".written").text(writtenCount);
	$(".writtenPct").text(math.format((writtenCount*100)/tweet_array.length, {notation:'fixed', precision: 2})+"%");

}

//Wait for the DOM to load
$(document).ready(function() {
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