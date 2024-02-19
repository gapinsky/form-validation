const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const send = document.querySelector('.send')
const clear = document.querySelector('.clear')
const popup = document.querySelector('.popup')



const showError = (input,msg) => {

const formBox = input.parentElement;
const errorMsg = formBox.querySelector('.error-text');

formBox.classList.add('error');
errorMsg.textContent = msg
}

const clearError = input => {
const formBox = input.parentElement
formBox.classList.remove('error')
}

const checkForm = input => {
    input.forEach(el => {
        if(el.value === ''){
            showError(el, el.placeholder);
        } else {
            clearError(el)
        }
    })

}


const checkLength = (input, min) => {

    if(input.value.length < min){
        showError(input, `${input.previousElementSibling.innerText.slice(0,-1)} składa się z min. ${min} znaków.`)
    }
}

const checkPassword = (pass1, pass2) => {
    if(pass1.value !== pass2.value){
        showError(pass2, 'Hasła nie są takie same')
    }
}

const checkMail = email => {
   const re = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm

   if(re.test(email.value)){
    clearError(email)
   } else{
    showError(email, 'E-mail jest niepoprawny')
   }
}

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box')
    let errorCount = 0;

    allInputs.forEach(el => {
        if(el.classList.contains('error')){
            errorCount++;
        }
    })

    if(errorCount === 0){
        popup.classList.add('show-popup')
    }
}

send.addEventListener('click', e => {
    e.preventDefault()

    checkForm([username, pass, pass2, email])
    checkLength(username, 3)
    checkLength(pass, 8)
    checkPassword(pass, pass2)
    checkMail(email)
    checkErrors()
})

clear.addEventListener('click', e => {
e.preventDefault();

[username, pass, pass2, email].forEach(el => {
    el.value = '';
    clearError(el)
});
})