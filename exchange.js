var selectedCurrency = " dollars";

function changeCurrency(){
  var currency = document.getElementById("currency");
  selectedCurrency = currency.options[currency.selectedIndex].value;

  var rateElement = document.getElementById("rate");
  
  switch(selectedCurrency){
    case "Dollars":
      rateElement.value = 77.8;
      break;
    case "Euros":
      rateElement.value = 102.3;
      break;
    case "Yuans":
      rateElement.value = 12.3;
      break;
    default:
      rateElement.value = 1;
      break;
  }

  document.getElementById("buttonExchange").value = selectedCurrency + " -> Yens";
  document.getElementById("buttonExchange2").value = "Yens -> " + selectedCurrency;
}

function exchange(exchangeType){
  var rate = document.getElementById("rate").value;
  var inMoney = document.getElementById("inMoney").value;

  var exchangeMoney;
  var currency;

  if(exchangeType == "toYen"){
    exchangeMoney = inMoney * rate;
    currency = " Yens";
  }else{
    exchangeMoney = inMoney / rate;
    //currency = " dollars"
    currency = selectedCurrency;
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
  outMoneyElement.innerHTML = exchangeMoney + " " + currency;
}