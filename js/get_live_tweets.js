function loadLiveRunkeeperTweets() {
	return new Promise(function(resolve, reject) {
	
		fetch("http://localhost:7890/1.1/search/tweets.json?q=RunKeeper&count=100&result_type=recent&lang-en").then(function(response){
			var newPromise = response.json();
			return newPromise;
		})
		.then(function(data){
			var liveArray = data.statuses;
			//console.log(liveArray);
			
			resolve(liveArray);
		});
	});
}