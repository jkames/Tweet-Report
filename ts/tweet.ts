class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        var str = this.text;
        
        if(str.startsWith("Just c") == true || str.startsWith("Just p") == true){
            return "completed_event";
        }
        else if(str.startsWith("Watch") == true){
            return "live_event";
        }
        else if(str.startsWith("Achieved") == true){
            return "achievement";
        }
        else{
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        var str = this.text;

        if(str.search("-") != -1){
            return true;
        }
        //TODO: identify whether the tweet is written
        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        var start = this.text.search("-");
        var parse = /#+/;
        var end = this.text.search("https");
        var ret = this.text.slice(start,end);

        return ret;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        var str = this.text;
        var sentence = /[km][mi]\s\b\w+\b/;
        var sentence2;
        var activity;
        var parsed = str.match(sentence);
        if(parsed != null){
            var ret = parsed[0].split(" ");
            return ret[1];
        }
        sentence = /(a|an)\s\b\w+\b/;
        parsed = str.match(sentence);
        if(parsed != null){
            ret = parsed[0].split(" ");
            return ret[1];
        }
        //TODO: parse the activity type from the text of the tweet
        return "unknown";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        var str = this.text;
        var sentence = /\d?\d.\d\d\s(km|mi)/;
        var parsed = str.match(sentence);
        if(parsed != null){
            var ret = parsed[0].split(" ");
            var metric = ret[1];
            var val = Number(ret[0]);
            if(metric == "mi"){
                val = val*1.609;
            }
            return val;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        //$("#tweetTable").append$("<tr<tdhello</td><td>yo</td></tr>"));
        var event;
        var str = this.text
        var parse = /http*/;
        var index = str.search(parse);
        var parseStr = str.slice(index, str.length);
        var chop = parseStr.split(" ");
        var linkIt = chop[0];
        var hash = chop[1];
        var linkStr = linkIt.link(linkIt);
        var sub = str.substring(0, index-1);
        sub = sub.concat(" ");
        sub = sub.concat(linkStr);
        sub = sub.concat(" ");
        sub = sub.concat(hash); 
        if(str.startsWith("Just c") == true || str.startsWith("Just p") == true){
            event = "completed_event";
        }
        else if(str.startsWith("Watch") == true){
            event = "live_event";
        }
        else if(str.startsWith("Achieved") == true){
            event = "achievement";
        }
        else{
            event = "miscellaneous";
        }
        return "<td>" + event + "</td><td>" + sub + "</td></tr>";
    }
}