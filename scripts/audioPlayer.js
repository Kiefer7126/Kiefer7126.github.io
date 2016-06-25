
var audio;
function init()
{
    $(document).ready(function() {
    $('select').material_select();
});
    audio = document.getElementById("sound");
}

function playSound()
{
    audio.play();
    console.log("play");
}

function pauseSound()
{
    audio.pause();
    console.log("pause");
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

