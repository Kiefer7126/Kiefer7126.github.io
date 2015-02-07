function exchange(exchangeType){
	var rate = document.getElementById("rate").value;
	var inMoney = document.getElementById("inMoney").value;

	var exchangeMoney;
	var currency;

	if(exchangeType == "toYen"){
		exchangeMoney = inMoney * rate;
		currency = " yens";
	}else{
		exchangeMoney = inMoney / rate;
		currency = " dollars"
	}

//小数点第三位で四捨五入
//100倍してから整数に丸めて100で割る
	exchangeMoney = Math.round(exchangeMoney * 100) / 100; 

	if(isNaN(exchangeMoney)){
		alert("数値を入力してください。");
		exchangeMoney = "---";
	}

	if(rate <= 0){
		alert("為替レートは0より大きな数値を入力してください。");
		exchangeMoney = "---";
	}

	var outMoneyElement = document.getElementById("outMoney");
	outMoneyElement.innerHTML = exchangeMoney + currency;
}