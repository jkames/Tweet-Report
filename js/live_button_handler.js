$(document).ready(function() {
	//Function-scope boolean to alter as the button switches state
	var liveTweets = false;

	//TODO: use jQuery to listen for a click event,
	//toggle the button text between "Switch to live tweets" and "Switch to saved tweets", 
	//and load the corresponding tweets
	
	$("#liveButton").on("click", function(){
		var $this = $(this);
		if($this.text() == "Switch to live tweets"){
			loadLiveRunkeeperTweets();
			$("#liveButton").text("Switch to saved tweets");
			//location.reload();
		}
		else{
			//fetch("twitter_proxy_config.json/1.1/search/tweets.json?q=#RunKeeper&lang-en")
			loadSavedRunkeeperTweets();	
			
			$("#liveButton").text("Switch to live tweets");
		}
	});
});
