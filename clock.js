function clock(){
			var now = new Date();

			var timeTokyo = now.getTime();//協定世界時(1970/01/01/00:00:00)から経過した時間(ms)
			var timeUTC = timeTokyo - 9*60*60*1000;//日本時間とUTCの差は9時間

			var cityElement = document.getElementById("city");
			var index = cityElement.selectedIndex;
			var timeZone = cityElement.options[index].value;

			var timeZoneElement = document.getElementById("timezone");
			timeZoneElement.innerHTML = "Timezone:" + timeZone;

			var timeCity = timeUTC + timeZone*60*60*1000;

			now = new Date(timeCity);

			var hour = now.getHours();
			var min = now.getMinutes();
			var sec = now.getSeconds();

			if(hour < 10) hour = "0" + hour;
			if(min < 10) min = "0" + min;
			if(sec < 10) sec = "0" + sec;

			var timeElement = document.getElementById("time");
			timeElement.innerHTML = hour + ":" + min + ":" + sec;

			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var day = now.getDate();

			if(year < 10) year = "0" + yaer;
			if(month < 10) month = "0" + month;
			if(day < 10) day = "0" + day;

			var weekArray = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];// 配列は{}ではなく[]
			var week = weekArray[now.getDay()];
			var dateElement = document.getElementById("date");
			dateElement.innerHTML = year + "/" + month + "/" + day + " " + week; 

			//setTimeout("clock()",1000);
			setInterval("clock()",1000);
		}