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