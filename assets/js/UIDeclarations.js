const register = document.querySelector('.register');
const login = document.querySelector('.login');
const confirm = document.querySelector('.confirm');
const forgot = document.querySelector('.forgot');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const sign = document.querySelector("#sign");
const reg = document.querySelector("#reg");
const forg = document.querySelector("#forg");
let email_input = document.querySelector('.email_input');
let password_input = document.querySelector('.password_input');
const confirm_input = document.querySelector('.confirm_input');
const header_register = document.querySelector('.header_register');
const header_login = document.querySelector(".header_login");
const form = document.querySelector('#form');

function visible(...visibles) {
    visibles.forEach(element => {
        element.style.display = 'block';
    });
}

function invisible(...invisibles) {
    invisibles.forEach(element => {
        element.style.display = 'none';
    });
}

function reseter() {
    form.reset();
    email_input.value = "";
    password_input.value = "";
}
reseter();
