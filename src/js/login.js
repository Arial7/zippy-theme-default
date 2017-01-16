document.addEventListener("DOMContentLoaded", () => {

    let mailField = document.body.querySelector("input#mail");
    let passField = document.body.querySelector("input#pass");

    let submitButton = document.body.querySelector("button#submit");

    submitButton.addEventListener("click", () => {
        submitButton.classList.toggle("disabled");
        submitButtonLoader.classList.toggle("hidden");
        submitButtonCheck.classList.toggle("hidden");

        fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: mailField.value,
                password: passField.value
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                console.log(res);
            })
    });

});
