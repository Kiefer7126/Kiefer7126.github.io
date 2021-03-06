var canvas, canvas2;
var ctx, ctx2;
var i = 0;
var rangeVal = 50;
var img;
var group = [];
var sortGroup;
var systemStep;
var beatInterval = 45;
var beatindex = 0;



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

function playClick(x, velocity) {
    var click = document.getElementById("clickBeat");
    if (beatStructure.beat[beatindex] > x - velocity / 10 && beatStructure.beat[beatindex] < x + velocity / 10) {
        click.currentTime = 0;
        click.play();
        beatindex++;
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