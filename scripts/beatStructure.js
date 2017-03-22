var beatStructure = {
    duration: 0,
    beat: []
};

function drawBeatCanvas() {
    var velocity = canvas3.width / audio.duration;
    var x = audio.currentTime * velocity;


    beatStructure.beat.sort(order)

    playClick(x, velocity);

    ctx3.fillStyle = "rgb(240,255,255)";
    ctx3.fillRect(0, 0, canvas3.width, canvas3.height);

    drawSeekBar(x);
    drawBeat();
    drawBeatCandidate();
    drawBeatCircle();
}

function drawBeatCandidate() {
    if (beatStructure.beat.length > 1) {
        xpoint = (2 * beatStructure.beat[beatStructure.beat.length-1] - beatStructure.beat[beatStructure.beat.length-2])
        ctx3.beginPath();
        ctx3.strokeStyle = 'rgb(140, 170, 192)'; // 灰色
        ctx3.moveTo(xpoint, 0);
        ctx3.lineTo(xpoint, 0);
        ctx3.lineTo(xpoint, canvas3.height);
        ctx3.stroke();
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