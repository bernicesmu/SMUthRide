const sign_in_btn = document.querySelector("#sign-in-btn");
const register_btn = document.querySelector("#register-btn");
const container = document.querySelector(".container")

register_btn.addEventListener('click', () => {
    container.classList.add("register-mode");
})

sign_in_btn.addEventListener('click', () => {
    container.classList.remove("register-mode");
})
