			function lastUpdate(){
				var modiDate = new Date(document.lastModified);
				var year = modiDate.getFullYear();
				var month = modiDate.getMonth();
				var date = modiDate.getDate();
				var hour = modiDate.getHours();
				var minute = modiDate.getMinutes();
				var second = modiDate.getSeconds();
				var monthArray = ["Jan. ", "Feb. ", "Mar. ", "Apr. ", "May ", "June ", "July ", "Aug. ", "Sep. ", "Oct. ", "Nov. ", "Dec. ",]

				var lastUpdateElement = document.getElementById("lastUpdateTxt");
				lastUpdateElement.innerHTML = "Last updated: " + monthArray[month] + date + ", " + year + " " + hour + ":" + minute + ":" + second;
			}
			