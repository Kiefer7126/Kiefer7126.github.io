function init() {

}

function inverse() {
    var text = document.getElementById('textareaBefore').value;
    var lineArray = text.split(/\r\n|\r|\n/);

    console.log(lineArray);

    var inverseArray = [];
    for (var i = 1; i <= lineArray.length; i++) {
        inverseArray[inverseArray.length] = lineArray[lineArray.length - i];
    }

    console.log(inverseArray);

    var resultString = '';
    for (var i = 0; i < inverseArray.length; i++) {
        resultString += inverseArray[i];
        resultString += "\n"
    }

    document.getElementById('textareaAfter').value = resultString;
    $('#textareaAfter').trigger('autoresize');
}

function transpose() {
    var text = document.getElementById('textareaTransBefore').value;
    var lineArray = text.split(/\r\n|\r|\n/);
    var elementArray = [];

    for (var i = 0; i < lineArray.length; i++) {
        elementArray[elementArray.length] = lineArray[i].split(/\|/);
        elementArray[elementArray.length - 1].shift();
        elementArray[elementArray.length - 1].pop();
    }

    var transElementArray = [];
    var transLineArray = [];
    var temptransElementArray = [];

    for (var j = 0; j < elementArray[0].length; j++) {
        temptransElementArray.length = 0;

        for (var i = 0; i < elementArray.length; i++) {
            temptransElementArray[temptransElementArray.length] = elementArray[i][j];
        }
        console.log("temptransElementArray");
        console.log(temptransElementArray);
        transElementArray = temptransElementArray.concat();
        transLineArray[transLineArray.length] = transElementArray;
    }
    console.log("lineArray");
    console.log(lineArray);
    console.log("elementArray");
    console.log(elementArray);
    console.log("transElementArray");
    console.log(transElementArray);
    console.log("transLineArray");
    console.log(transLineArray);
    
    
    var resultString = '';
    for (var i = 0; i < transLineArray.length; i++) {
        resultString += "\|"
        for(var j = 0; j < transLineArray[0].length; j++){
        resultString += transLineArray[i][j] + "\|";
        }
        resultString += "\n"
    }
    
        document.getElementById('textareaTransAfter').value = resultString;
    $('#textareaTransAfter').trigger('autoresize');

}