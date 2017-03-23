var groupingStructure = {
    hierarchy: 1,
    grouping: []
};

var outputGrouping = {
    duration: 0,
    grouping: []
};

var tempGroupingStructure = {
    hierarchy: 1,
    grouping: []
};

var hierarchyNum = 1;
var groupingBoundary = [];
var groupingHead = [];
var groupingHead_ms = [];

function drawGroupingCanvas() {
    ctx4.fillStyle = "rgb(0,0,0)";
    ctx4.fillRect(0, 0, canvas4.width, canvas4.height);
    drawBeatStructure(ctx4, "group", canvas4.height);
    drawGroupingCircles(ctx4, "group", canvas4.height);
    drawGroupingIndex();
    if (hierarchyNum != 1) {
        drawGroupingStructure(ctx4, canvas4.height);
    }
    groupingBoundary.sort(order);

}

function order(a, b) {
    if (a > b) return 1;
    else if (a < b) return -1;
    else return 0;
}

function drawGroupingCircles(context, flag, canvasHeight) {
    var y = canvasHeight;
    for (var i = 0; i < beatStructure.beat.length; i++) {
        for (var j = 0; j <= hierarchyNum; j++) {
            if (j != 0) {
                y = canvasHeight / hierarchyNum;
            }
            context.beginPath();
            context.fillStyle = 'rgb(80, 80, 80)';
            context.arc(beatStructure.beat[i], 10 + y * j, 10, 0, Math.PI * 2, true);
            context.fill();
        }
    }
}


function drawGroupingIndex() {
    var strictY = canvas4.height;
    if (hierarchyNum != 1) strictY = canvas4.height / hierarchyNum;

    for (var i = 0; i < groupingBoundary.length; i++) {
        ctx4.beginPath();
        ctx4.fillStyle = 'rgb(80, 130, 230)';
        ctx4.arc(groupingBoundary[i], 10 + canvas4.height - strictY, 10, 0, Math.PI * 2, true);
        ctx4.fill();
    }
}

function drawGroupingStructure(context, canvasHeight) {
    var y = canvas4.height / hierarchyNum;
    for (var i = 1; i < groupingHead.length; i++) {
        for (var j = 0; j < groupingHead[i].length; j++) {
            //y = canvasHeight / (groupingHead.length-1)
            context.beginPath();
            context.fillStyle = 'rgb(80, 130, 230)';
            context.arc(groupingHead[i][j], 10 + y * (i - 1), 10, 0, Math.PI * 2, true);
            context.fill();
        }
    }
}

function clearGrouping() {
    groupingBoundary = [];
    groupingHead = [];
    groupingHead[0] = beatStructure.beat;
    outputGrouping = {};
    hierarchyNum = 1;
}

function splitCanvas() {
    //groupingStructure.grouping = groupingBoundary;

    groupingHead[groupingHead.length] = groupingBoundary;


    for (var i = 0; i < groupingBoundary.length - 1; i++) {
        beginIndex = $.inArray(groupingBoundary[i], beatStructure.beat);
        endIndex = $.inArray(groupingBoundary[i + 1], beatStructure.beat);

        tempGroupingStructure = new Object();

        tempGroupingStructure.hierarchy = hierarchyNum;
        tempGroupingStructure.grouping = beatStructure.beat.slice(beginIndex, endIndex);

        groupingStructure.grouping.push(tempGroupingStructure);

        //groupingStructure.grouping[groupingStructure.grouping.length] = tempGroupingStructure;
    }

    //最後のグルーピング
    beginIndex = $.inArray(groupingBoundary[groupingBoundary.length - 1], beatStructure.beat);
    endIndex = beatStructure.beat.length - 1
    tempGroupingStructure = new Object();
    tempGroupingStructure.hierarchy = hierarchyNum;
    tempGroupingStructure.grouping = beatStructure.beat.slice(beginIndex, endIndex);
    groupingStructure.grouping.push(tempGroupingStructure);

    hierarchyNum++;
    groupingBoundary = [];
}

function isClickCircle(structure, x, y, strictY) {
    if (structure - 10 < Math.round(x) && structure + 10 > Math.round(x) && y < 20 + canvas4.height - strictY && y > canvas4.height - strictY) {
        return true;
    }
    return false;
}

function storeBoundary(x, y) {
    var strictY = canvas4.height;
    if (hierarchyNum != 1) strictY = canvas4.height / hierarchyNum;

    for (var i = 0; i < beatStructure.beat.length; i++) {
        if (isClickCircle(beatStructure.beat[i], x, y, strictY)) {
            groupingBoundary[groupingBoundary.length] = beatStructure.beat[i];
            return true;
        }
    }
    return false;

}

function deleteBoundary(x, y) {
    var strictY = canvas4.height;
    if (hierarchyNum != 1) strictY = canvas4.height / hierarchyNum;

    for (var i = 0; i < groupingBoundary.length; i++) {
        if (isClickCircle(groupingBoundary[i], x, y, strictY)) {
            groupingBoundary.splice(i, 1);
            return true;
        }
    }
    return false;
}

function groupingToJson(array) {

    var content = "";


    var v = canvas4.width / audio.duration;
    var groupingArray = arrayElementcalc(array, v);

    //    var group_ms = 0;
    //    
    //    
    //
    //    for (var i = 0; i < groupingArray.length; i++) {
    //        for (var j = 0; j < groupingArray[i].length; j++) {
    //            groupingArray[i][j] = Math.round((groupingArray[i][j] / v) * 100);
    //        }
    //    }


    //    for (var i = 0; i < array.length; i++) {
    //        content = content + "["
    //        for (var j = 0; j < array[i].length; j++) {
    //            group_ms = Math.round((array[i][j] / v) * 100);
    //            if (j == array[i].length - 1) {
    //                content = content + group_ms;
    //            } else {
    //                content = content + group_ms + ",";
    //            };
    //        }
    //        if (i == array[i].length - 1) {
    //            content = content + "]\n]}"
    //        } else {
    //            content = content + "],\n"
    //        };
    //    }
    outputGrouping.grouping = groupingArray;
    content = JSON.stringify(outputGrouping, "\t");

    return content;
}