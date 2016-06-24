var audio;
function init()
{
    audio = document.getElementById("sound");
}

function playSound()
{
    audio.play();
}

function pauseSound()
{
    audio.pause();
}

function goSound(msec)
{
    audio.currentTime = msec/100;
}

function resetSound()
{
    audio.pause();
    audio.currentTime = 0;
}

function handleFiles(file)
{
    resetSound();
    audio.src = URL.createObjectURL(file[0]);
}

