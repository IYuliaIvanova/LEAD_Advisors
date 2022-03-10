const form = document.getElementById("form");
const modalForm = document.getElementById("modal");
const modalFormMessage = document.getElementById("modalForm");
const email = document.getElementById("formEmail");
const titleModal = document.querySelector("#titleModal");
const textModal = document.querySelector("#textModal");

const closeBtn = [...document.querySelectorAll(".closeBtn")].forEach((item) => {
  item.addEventListener("click", () => {
    modalForm.style.visibility = "hidden";
  });
});

function validateEmail(inputText) {
  let error = 0;
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (inputText === "") {
    email.classList.add("_error");
    error += 1;
  } else if (inputText.match(mailFormat)) {
    email.classList.remove("_error");
    return error;
  } else {
    email.classList.add("_error");
    error += 1;
  }
  return error;
}

async function formSend(e) {
  e.preventDefault();

  let error = validateEmail(email.value);

  modalForm.style.visibility = "visible";

  if (error === 0) {
    modalFormMessage.classList.add("_sending");

    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        modalFormMessage.classList.remove("_sending");
        response.json();
      })
      .then(() => {
        titleModal.innerText = "SUCCESS!";
        textModal.innerText =
          "You have successfully subscribed to the email newsletter";
      })
      .catch(() => {
        titleModal.innerText = "Error!";
        textModal.innerText = "Error in the input field!";
      });
  } else {
    titleModal.innerText = "Error!";
    textModal.innerText = "Error in the input field!";
  }
}

form.addEventListener("submit", formSend);
