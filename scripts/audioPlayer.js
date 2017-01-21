
var audio;

function init()
{
    $(document).ready(function() {
    $('select').material_select();
        
    $(document).ready(function(){
    $('.slider').slider({full_width: true});
    });
        
        
});
    audio = document.getElementById("sound");
}

function playSound()
{
    audio.play();
    console.log("play");
    beatindex = 0;
}

function pauseSound()
{
    audio.pause();
    console.log("pause");
}

function backSound()
{
    audio.currentTime = audio.currentTime - 1;
    console.log(audio.currentTime);
}

function goSound(msec)
{
    audio.currentTime = msec/100;
}

function resetSound()
{
    audio.pause();
    audio.currentTime = 0;
    console.log("reset");
}

function handleFiles(file)
{
    resetSound();
    audio.src = URL.createObjectURL(file[0]);
}