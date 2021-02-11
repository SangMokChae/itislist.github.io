const nameForm = document.querySelector("#nameForm"),
  nameInput = nameForm.querySelector("input"),
  userName = nameForm.querySelector("#userName");

const USER_LS = "user";

const handleSubmit = () => {
  user = nameInput.value;
  userName.innerHTML = `Welcome. ${user}~!`;
  localStorage.setItem(USER_LS, user);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  if (currentUser !== null) {
    userName.innerHTML = `Welcome. ${currentUser}~!`;
    nameForm.removeChild(nameInput);
    document.querySelector(".hello-emoji").classList.toggle('emoji-hidden');
  }
}

function init() {
  loadName();
  nameForm.addEventListener("submit", handleSubmit);
}

init();