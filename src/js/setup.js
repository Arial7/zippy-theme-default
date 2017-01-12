document.addEventListener("DOMContentLoaded", () => {
    let submitButton = document.querySelector("button#submit");
    let submitButtonCheck = submitButton.querySelector(".icon");
    let submitButtonLoader = submitButton.querySelector(".loader");

    submitButton.addEventListener("click", () => {
        submitButton.classList.toggle("disabled");
        submitButtonLoader.classList.toggle("hidden");
        submitButtonCheck.classList.toggle("hidden");
    });
});
