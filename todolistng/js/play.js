const audioForm = document.querySelector("#formToDos");

const play = () => {
  const audio = document.querySelector(".audio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}

function init() {
  audioForm.addEventListener("submit", play);
}
init();