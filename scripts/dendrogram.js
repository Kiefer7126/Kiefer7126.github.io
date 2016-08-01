var canvas,canvas2;
var ctx, ctx2;
var i = 0;
var rangeVal = 50;
var img;
//var group = [34, 38, 66, 72, 54, 80, 9, 71, 24, 51, 50, 52, 23, 29, 1, 32, 57, 45, 35, 55, 42, 60, 30, 7, 14, 43, 65, 64, 33, 79, 25, 67, 69, 5, 28, 17, 31, 27, 39, 59, 76, 68, 48, 88, 47, 40, 53, 70, 13, 58, 10, 6, 73, 63, 26, 41, 56, 62, 46, 44, 49, 77, 61, 2, 78, 8, 75, 86, 81, 19, 82, 36, 87, 83, 21, 74, 84, 85, 3, 11, 18, 37, 20, 0, 12, 4, 22, 16, 15];
var group = [];
var sortGroup;
var systemStep;
var beatInterval = 45;

$(document).ready( function(){
 canvas = document.getElementById('dendrogramCanvas');
        if (canvas.getContext){
          ctx = canvas.getContext('2d');
            //輪郭線による描画
            setInterval(draw, 100);
        }
        sortGroup = new Array();
        startTime = new Array();
    
canvas2 = document.getElementById('chorusCanvas');
        if (canvas2.getContext){
          ctx2 = canvas2.getContext('2d');
            //輪郭線による描画
           drawChorus();
        }
    
/* 変更中（ドラッグ中） */
$( 'input[type=range]' ).on( 'input', function () {
	rangeVal = $(this).val();
});
    
    /* 変更後 */
$( 'input[type=range]' ).change( function () {
	rangeVal = $(this).val();
    startTime = new Array();
    sortGroup = new Array();
    
    for (var i=0; i <= rangeVal; i++)
        {            
            startTime[startTime.length] = group[i] * beatInterval;
            sortGroup[sortGroup.length] = group[i]
                              
        }
    
    //console.log(startTime);
    
    sortGroup.sort(function(a,b){
        if(a<b) return -1;
        if(a>b) return 1;
        return 0;
    });
    console.log(sortGroup);
    segmentSet();
//    goSound(group[rangeVal] * 45)
} );
    
});


$(function() {
    // クリック処理
    $('canvas').click( function(event){
        // クリックの度に canvas の左上座標を取得する
                
        var rect = $(event.target).offset();
    
        var x = event.pageX - rect.left;
    //    console.log("x:" + x);
  //      console.log(y)
        for(var i = 0; i < sortGroup.length; i++)
            {
      //          console.log(i + " : " + sortGroup[i]*systemStep);
            }

        if(x < sortGroup[0] * systemStep && x > 0) 
        {
            goSound(0);
            //console.log("x < " + sortGroup[0]*systemStep + " && " + "x > 0");
        }
        
        for(var i = 1; i < sortGroup.length; i++)
            {
                if(x > sortGroup[i-1] * systemStep && x < sortGroup[i] * systemStep) 
                {
                    goSound(sortGroup[i-1] * beatInterval);
                    //console.log("x < " + sortGroup[i]*systemStep + " && " + "x > " + sortGroup[i-1] * systemStep);               
                }
            }

    });
});

function draw()
{    
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
    for(var i = 0; i <= sortGroup.length; i++)
        {
            if(i == sortGroup.length)
            {
                groupLength = canvas.width - (systemStep * sortGroup[i]);
                ctx.fillRect(systemStep * sortGroup[i], canvas.height - 100, groupLength, 100);
            }
            else if(i == 0) 
            {
                groupLength = systemStep * sortGroup[0] -3;
                ctx.fillRect(0, canvas.height - 100, groupLength, 100);
            }
            else if(i >= 0)
            {
                groupLength = systemStep * (sortGroup[i] - sortGroup[i-1]) - 3;
                ctx.fillRect(systemStep * sortGroup[i-1], canvas.height - 100, groupLength, 100);
            }
        }
    
    for(var i = 0; i <= rangeVal; i++)
        {
            ctx.beginPath();
            ctx.strokeStyle  = 'rgb(192, 80, 77)'; // 赤
            ctx.moveTo(systemStep * group[i],0);
            ctx.lineTo(systemStep * group[i],0);
            ctx.lineTo(systemStep * group[i],canvas.height);
            ctx.stroke();
        }   
}

function drawChorus()
{    
    
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
    
    for(var i = 0; i < startTime.length; i++)
        {
            ctx2.beginPath();
            ctx2.strokeStyle  = 'rgb(192, 80, 77)'; // 赤
            ctx2.moveTo(systemStep * (startTime[i]/beatInterval),0);
            ctx2.lineTo(systemStep * (startTime[i]/beatInterval),0);
            ctx2.lineTo(systemStep * (startTime[i]/beatInterval),canvas.height);
            ctx2.stroke();
        }   
}

