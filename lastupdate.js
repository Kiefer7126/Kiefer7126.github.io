			function lastUpdate(){
				var modiDate = new Date(document.lastModified);
				var modiYear = modiDate.getFullYear();
				var modiMonth = modiDate.getMonth();
				var modiDay = modiDate.getDate();
				var modiHour = modiDate.getHours();
				var modiMinute = modiDate.getMinutes();
				var modiSecond = modiDate.getSeconds();
				var monthArray = ["Jan. ", "Feb. ", "Mar. ", "Apr. ", "May ", "June ", "July ", "Aug. ", "Sep. ", "Oct. ", "Nov. ", "Dec. ",];

				var lastUpdateElement = document.getElementById("lastUpdateTxt");
				lastUpdateElement.innerHTML = "Last updated: " + monthArray[modiMonth] + modiDay + ", " + modiYear + " " + modiHour + ":" + modiMinute + ":" + modiSecond;

				var now = new Date();
				var nowTime = now.getTime();
				var modiTime = modiDate.getTime();
				var agoTime = nowTime - modiTime; 
				var agoData = 0;

				if(agoTime > 0){
					var agoData = new Date(agoTime);
				}
				
				var updateAgoTimeTxt = 0 + " seconds ago.";

                if(agoData > 1000*60*60*24){
				  	updateAgoTimeTxt　= Math.floor(agoData/(1000*60*60*24)) + " days ago.";
				}else if(agoData > 1000*60*60){
				 	updateAgoTimeTxt　= Math.floor(agoData/(1000*60*60)) + " hours ago.";
			  	}else if(agoData > 1000*60){
				 	updateAgoTimeTxt　= Math.floor(agoData/(1000*60)) + " minutes ago.";
				}else if(agoData > 1000){
				 	updateAgoTimeTxt　= Math.floor(agoData/(1000)) + " seconds ago.";
				}else{
				 	updateAgoTimeTxt = 0 + " seconds ago."; 
				}

				var updateAgoElement = document.getElementById("updateAgoTxt");
				updateAgoElement.innerHTML = updateAgoTimeTxt;
			}
			