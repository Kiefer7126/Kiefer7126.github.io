var canvas;
var ctx;
var i = 0;
var rangeVal = 50;
var img;
$(document).ready( function(){
 canvas = document.getElementById('dendrogramCanvas');
        if (canvas.getContext){
          ctx = canvas.getContext('2d');
            //輪郭線による描画
            setInterval(draw, 50);
        }
    
      /* Imageオブジェクトを生成 */
  img = new Image();
  img.src = "images/dendrogramJs.png";

    
    
/* 変更中（ドラッグ中） */
$( 'input[type=range]' ).on( 'input', function () {
	rangeVal = $(this).val();
});
    
    /* 変更後 */
$( 'input[type=range]' ).change( function () {
	rangeVal = $(this).val();
} );
    
});

function draw()
{
    ctx.fillStyle = "rgba(255,255,255,.2)";
    ctx.fillRect(0, 0, 400, 300);
      /* 画像を描画 */
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            ctx.beginPath();
    ctx.strokeStyle  = 'rgb(192, 80, 77)'; // 赤
            ctx.moveTo(0,canvas.height*rangeVal/100);
            ctx.lineTo(0,canvas.height*rangeVal/100);
            ctx.lineTo(canvas.width, canvas.height*rangeVal/100);
            ctx.stroke();

}
