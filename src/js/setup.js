document.addEventListener("DOMContentLoaded", () => {
    let submitButton = document.querySelector("button#submit");
    let submitButtonCheck = submitButton.querySelector(".icon");
    let submitButtonLoader = submitButton.querySelector(".loader");

    let siteNameField = document.body.querySelector("input#site-name");
    let baseURLField = document.body.querySelector("input#base-url");
    let themeField = document.body.querySelector("select#theme");

    let accountNameField = document.body.querySelector("input#acc-name");
    let accountMailField = document.body.querySelector("input#acc-mail");
    let accountPasswordField = document.body.querySelector("input#acc-pass");
    let accountPasswordConfirmField = document.body.querySelector("input#acc-pass-confirm");

    let signupErrorText = document.body.querySelector("#signup-error");

    accountPasswordConfirmField.addEventListener("input", (event) => {
        if (event.target.value !== accountPasswordField.value) {
            accountPasswordConfirmField.classList.add("invalid");
        } else {
            accountPasswordConfirmField.classList.remove("invalid");
        }
    })


    submitButton.addEventListener("click", () => {
        submitButton.classList.toggle("disabled");
        submitButtonLoader.classList.toggle("hidden");
        submitButtonCheck.classList.toggle("hidden");

        if (accountPasswordConfirmField.value === accountPasswordField.value) {
            fetch("/api/initialSetup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    siteName: siteNameField.value,
                    baseURL: baseURLField.value,
                    theme: themeField.value,
                    accountName: accountNameField.value,
                    accountMail: accountMailField.value,
                    accountPassword: accountPasswordField.value
                })
            })
                .then(( response ) => {
                    return response.json();
                })
                .then(( res ) => {
                    if (res.success == true) {
                        window.location.pathname = "/adm"
                    } else {
                        signupErrorText.innerText = res.error
                    }
                    console.log(res);
                })

        } else {
            signupErrorText.innerText = "Your passwords did not match"
            submitButton.classList.toggle("disabled");
            submitButtonLoader.classList.toggle("hidden");
            submitButtonCheck.classList.toggle("hidden");
        }

    });
});
