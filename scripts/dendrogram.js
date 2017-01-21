var canvas, canvas2;
var ctx, ctx2;
var i = 0;
var rangeVal = 50;
var img;
//var group = [34, 38, 66, 72, 54, 80, 9, 71, 24, 51, 50, 52, 23, 29, 1, 32, 57, 45, 35, 55, 42, 60, 30, 7, 14, 43, 65, 64, 33, 79, 25, 67, 69, 5, 28, 17, 31, 27, 39, 59, 76, 68, 48, 88, 47, 40, 53, 70, 13, 58, 10, 6, 73, 63, 26, 41, 56, 62, 46, 44, 49, 77, 61, 2, 78, 8, 75, 86, 81, 19, 82, 36, 87, 83, 21, 74, 84, 85, 3, 11, 18, 37, 20, 0, 12, 4, 22, 16, 15];
var group = [];
var sortGroup;
var systemStep;
var beatInterval = 45;
var beatindex = 0;
var beatStructure = {
    duration: 0,
    beat: []
};
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

$(document).ready(function () {
    canvas = document.getElementById('dendrogramCanvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        //輪郭線による描画
        setInterval(drawDendrogramCanvas, 100);
    }
    sortGroup = new Array();
    startTime = new Array();

    canvas2 = document.getElementById('chorusCanvas');
    if (canvas2.getContext) {
        ctx2 = canvas2.getContext('2d');
        //輪郭線による描画
        drawChorusCanvas();
    }

    canvas3 = document.getElementById('audioCanvas');
    if (canvas3.getContext) {
        ctx3 = canvas3.getContext('2d');
        //輪郭線による描画
        setInterval(drawBeatCanvas, 100);
    }

    canvas4 = document.getElementById('groupingCanvas');
    if (canvas4.getContext) {
        ctx4 = canvas4.getContext('2d');
        //輪郭線による描画
        setInterval(drawGroupingCanvas, 100);
    }

    /* 変更中（ドラッグ中） */
    $('input[type=range]').on('input', function () {
        rangeVal = $(this).val();
    });

    /* 変更後 */
    $('input[type=range]').change(function () {
        rangeVal = $(this).val();
        startTime = new Array();
        sortGroup = new Array();

        for (var i = 0; i <= rangeVal; i++) {
            startTime[startTime.length] = group[i] * beatInterval;
            sortGroup[sortGroup.length] = group[i]

        }

        sortGroup.sort(function (a, b) {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
        console.log(sortGroup);
        segmentSet();
        //    goSound(group[rangeVal] * 45)
    });

});

$(function () {
    // クリック処理
    $("#groupingCanvas").click(function (event) {
        var rect = $(event.target).offset();

        var x = event.pageX - rect.left;
        var y = event.pageY - rect.top;

        if (!deleteBoundary(x, y)) storeBoundary(x, y);

        // drawBeatStructure(ctx4, "group", canvas4.length);

    });

    $("#audioCanvas").click(function (event) {
        var rect = $(event.target).offset();

        var x = event.pageX - rect.left;
        var y = event.pageY - rect.top;

        if (!deleteBeat(x, y)) storeBeat(x);

    });

    $("#dendrogramCanvas").click(function (event) {
        // クリックの度に canvas の左上座標を取得する

        var rect = $(event.target).offset();

        var x = event.pageX - rect.left;
        var y = event.pageY - rect.top;

        //if (!deleteBeat(x, y)) storeBeat(x);

        for (var i = 0; i < sortGroup.length; i++) {
            //          console.log(i + " : " + sortGroup[i]*systemStep);
        }

        if (x < sortGroup[0] * systemStep && x > 0) {
            goSound(0);
            //console.log("x < " + sortGroup[0]*systemStep + " && " + "x > 0");
        }

        for (var i = 1; i < sortGroup.length; i++) {
            if (x > sortGroup[i - 1] * systemStep && x < sortGroup[i] * systemStep) {
                goSound(sortGroup[i - 1] * beatInterval);
                //console.log("x < " + sortGroup[i]*systemStep + " && " + "x > " + sortGroup[i-1] * systemStep); 
            }
        }
    });
});

function drawDendrogramCanvas() {
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    /* 画像を描画 */

    systemStep = canvas.width / group.length;
    ctx.fillStyle = "rgba(155,155,255,0.5)";
    /*
    for(var i = 0; i < 90; i++)
        {
            ctx.fillRect(i * systemStep, canvas.height - 100, systemStep, 100);
        }
        */
    //ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    /*
            ctx.beginPath();
    ctx.strokeStyle  = 'rgb(192, 80, 77)'; // 赤
            ctx.moveTo(0,canvas.height*rangeVal/100);
            ctx.lineTo(0,canvas.height*rangeVal/100);
            ctx.lineTo(canvas.width, canvas.height*rangeVal/100);
            ctx.stroke();
            */
    for (var i = 0; i <= sortGroup.length; i++) {
        if (i == sortGroup.length) {
            groupLength = canvas.width - (systemStep * sortGroup[i]);
            ctx.fillRect(systemStep * sortGroup[i], canvas.height - 100, groupLength, 100);
        } else if (i == 0) {
            groupLength = systemStep * sortGroup[0] - 3;
            ctx.fillRect(0, canvas.height - 100, groupLength, 100);
        } else if (i >= 0) {
            groupLength = systemStep * (sortGroup[i] - sortGroup[i - 1]) - 3;
            ctx.fillRect(systemStep * sortGroup[i - 1], canvas.height - 100, groupLength, 100);
        }
    }

    for (var i = 0; i <= rangeVal; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(192, 80, 77)'; // 赤
        ctx.moveTo(systemStep * group[i], 0);
        ctx.lineTo(systemStep * group[i], 0);
        ctx.lineTo(systemStep * group[i], canvas.height);
        ctx.stroke();
    }
}

function drawChorusCanvas() {

    // console.log("drawChorus");
    ctx2.fillStyle = "rgb(255,255,255)";
    ctx2.fillRect(0, 0, canvas.width, canvas.height);
    /* 画像を描画 */

    systemStep = canvas.width / group.length;
    ctx2.fillStyle = "rgba(155,155,255,0.5)";

    /*
    for(var i = 0; i <= sortGroup.length; i++)
        {
            if(i == sortGroup.length)
            {
                groupLength = canvas.width - (systemStep * sortGroup[i]);
                ctx2.fillRect(systemStep * sortGroup[i], canvas.height - 100, groupLength, 100);
            }
            else if(i == 0) 
            {
                groupLength = systemStep * sortGroup[0] -3;
                ctx2.fillRect(0, canvas.height - 100, groupLength, 100);
            }
            else if(i >= 0)
            {
                groupLength = systemStep * (sortGroup[i] - sortGroup[i-1]) - 3;
                ctx2.fillRect(systemStep * sortGroup[i-1], canvas.height - 100, groupLength, 100);
            }
        }
        */

    for (var i = 0; i < startTime.length; i++) {
        ctx2.beginPath();
        ctx2.strokeStyle = 'rgb(192, 80, 77)'; // 赤
        ctx2.moveTo(systemStep * (startTime[i] / beatInterval), 0);
        ctx2.lineTo(systemStep * (startTime[i] / beatInterval), 0);
        ctx2.lineTo(systemStep * (startTime[i] / beatInterval), canvas.height);
        ctx2.stroke();
    }
}

function drawBeatCanvas() {
    var velocity = canvas3.width / audio.duration;
    var x = audio.currentTime * velocity;


    beatStructure.beat.sort(order)

    playClick(x, velocity);

    ctx3.fillStyle = "rgb(240,255,255)";
    ctx3.fillRect(0, 0, canvas3.width, canvas3.height);

    drawSeekBar(x);
    drawBeat();
    drawBeatCircle();
}

function drawGroupingCanvas() {
    ctx4.fillStyle = "rgb(240,255,255)";
    ctx4.fillRect(0, 0, canvas4.width, canvas4.height);
    drawBeatStructure(ctx4, "group", canvas4.height);
    drawGroupingCircles(ctx4, "group", canvas4.height);
    drawGroupingIndex();
    if (hierarchyNum != 1) {
        drawGroupingStructure(ctx4, canvas4.height);
    }
    groupingBoundary.sort(order);

}

function playClick(x, velocity) {
    var click = document.getElementById("clickBeat");
    if (beatStructure.beat[beatindex] > x - velocity / 10 && beatStructure.beat[beatindex] < x + velocity / 10) {
        click.currentTime = 0;
        click.play();
        beatindex++;
    }
}

function drawSeekBar(x) {
    ctx3.beginPath();
    ctx3.strokeStyle = 'rgb(192, 80, 77)'; // 赤
    ctx3.moveTo(x, 0);
    ctx3.lineTo(x, 0);
    ctx3.lineTo(x, canvas3.height);
    ctx3.stroke();

}

function drawBeatCircle() {
    for (var i = 0; i < beatStructure.beat.length; i++) {
        ctx3.beginPath();
        //ctx3.strokeStyle = 'rgb(80, 77, 192)'; // 青
        ctx3.fillStyle = 'rgb(192, 77, 192)'; // 赤
        ctx3.arc(beatStructure.beat[i], 10, 10, 0, Math.PI * 2, true);
        ctx3.fill();
    }
}

function drawGroupingCircles(context, flag, canvasHeight) {
    var y = canvasHeight;
    for (var i = 0; i < beatStructure.beat.length; i++) {
        for (var j = 0; j <= hierarchyNum; j++) {
            if (j != 0) {
                y = canvasHeight / hierarchyNum;
            }
            context.beginPath();
            context.fillStyle = 'rgb(180, 180, 180)';
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
        ctx4.fillStyle = 'rgb(80, 50, 180)';
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
            context.fillStyle = 'rgb(80, 50, 180)';
            context.arc(groupingHead[i][j], 10 + y * (i - 1), 10, 0, Math.PI * 2, true);
            context.fill();
        }
    }
}

function storeBeat(x) {
    beatStructure.beat[beatStructure.beat.length] = Math.round(x);
    groupingHead[0] = beatStructure.beat;
}

function clearBeat() {
    beatStructure.beat = [];
    groupingBoundary = [];
    groupingHead = [];
    outputGrouping = {};
    hierarchyNum = 1;
}

function clearGrouping() {
    groupingBoundary = [];
    groupingHead = [];
    groupingHead[0] = beatStructure.beat;
    outputGrouping = {};
    hierarchyNum = 1;
}

function drawBeat() {
    for (var i = 0; i < beatStructure.beat.length; i++) {
        ctx3.beginPath();
        ctx3.strokeStyle = 'rgb(80, 77, 192)'; // 青
        ctx3.moveTo(beatStructure.beat[i], 0);
        ctx3.lineTo(beatStructure.beat[i], 0);
        ctx3.lineTo(beatStructure.beat[i], canvas3.height);
        ctx3.stroke();
    }
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

function drawBeatStructure(context, flag, canvasHeight) {
    for (var i = 0; i < beatStructure.beat.length; i++) {
        for (var j = 0; j <= hierarchyNum; j++) {
            context.beginPath();

            if (flag == "beat") {
                context.strokeStyle = 'rgb(80, 77, 192)';
            } else if (flag == "group") {
                context.strokeStyle = 'rgb(200, 200, 200)';
            }
            context.moveTo(beatStructure.beat[i], 0);
            context.lineTo(beatStructure.beat[i], 0);
            context.lineTo(beatStructure.beat[i], (canvasHeight / hierarchyNum) * j);
            context.stroke();
        }
    }
}

function deleteBeat(x, y) {
    for (var i = 0; i < beatStructure.beat.length; i++) {
        if (isClickCircle(beatStructure.beat[i], x, y, canvas4.height)) {
            beatStructure.beat.splice(i, 1);
            return true;
        }
    }
    return false;
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

function order(a, b) {
    if (a > b) return 1;
    else if (a < b) return -1;
    else return 0;
}

function convertToText(array) {
    array.sort(order);

    var content = "{ \"audioduration\" : " + audio.duration + ", \n \"beat\" : [";

    var v = canvas3.width / audio.duration;
    var beat_ms = 0;

    for (var i = 0; i < array.length; i++) {

        beat_ms = Math.round((array[i] / v) * 100);
        if (i == array.length - 1) content = content + beat_ms + "]\n}";
        else content = content + beat_ms + ",\n";
    }

    return content;
}

function exportBeat() {

    beatStructure.duration = audio.duration;
    var content = convertToText(beatStructure.beat);

    var filename = "";

    console.log(document.getElementById("fileUploadAudio").files.length);
    if (document.getElementById("fileUploadAudio").files.length == 0) {
        filename = "undefine_beat.txt"
    } else {
        filename = splitExt(document.getElementById("fileUploadAudio").files[0].name)[0] + "_beat.txt"
    }

    var blob = new Blob([content], {
        "type": "text/plain"
    });

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
        // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        //window.navigator.msSaveOrOpenBlob(blob, "test.txt"); 

        console.log("a")
    } else {
        document.getElementById("download").download = filename;
        document.getElementById("download").href = window.URL.createObjectURL(blob);
        console.log("b")
    }
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

function arrayElementcalc(array, number) {
    var toArray = [];
    var toBoundary = [];
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            toBoundary[toBoundary.length] = Math.round((array[i][j] / number) * 100);
        }
        toArray[toArray.length] = toBoundary;
        toBoundary = [];
    }
    return toArray;
}

function exportGrouping() {

    if (Number.isNaN(audio.duration)) {
        alert("楽曲の長さが取得できませんでした。\n楽曲か拍節構造を読み込んでください．")
    } else {
        outputGrouping.duration = audio.duration;
        var content = groupingToJson(groupingHead);

        console.log(content);

        var filename = "";

        console.log(document.getElementById("fileUploadAudio").files.length);
        if (document.getElementById("fileUploadAudio").files.length == 0) {
            filename = "undefine_group.txt"
        } else {
            filename = splitExt(document.getElementById("fileUploadAudio").files[0].name)[0] + "_group.txt"
        }

        var blob = new Blob([content], {
            "type": "text/plain"
        });

        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, filename);
            // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
            //window.navigator.msSaveOrOpenBlob(blob, "test.txt"); 

            console.log("a")
        } else {
            document.getElementById("downloadGrouping").download = filename;
            document.getElementById("downloadGrouping").href = window.URL.createObjectURL(blob);
            console.log("b")
        }
    }
}

function splitExt(filename) {
    return filename.split(/\.(?=[^.]+$)/);
}