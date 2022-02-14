import {Question} from "./question.js";
import {createModal, isValid} from './utils.js'
import './styles.css'
import {authWithEmailAndPassword, getAuthForm} from "./auth";

const modalBtn = document.getElementById( "modal-btn")
const form = document.getElementById( "form")
const input = form.querySelector ( "#question-input")
const submitBtn = form.querySelector( "#submit")


window.addEventListener('load',Question.renderList())
form.addEventListener('submit', submitFormHandler)
modalBtn.addEventListener('click', openModal)
input.addEventListener('input', ()=>{
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler (event) {
    event.preventDefault()
    if (isValid(input.value)) {
       const question = {
           text: input.value.trim(),
           date: new Date().toJSON()
       }
       submitBtn.disabled = true
        Question.create(question).then( () =>{
            input.value= ' '
            input.className = ' '
            submitBtn.disabled =false
        })
    }
}

function openModal(){
createModal('Авторизация',getAuthForm())
    document
        .getElementById('auth-form')
        .addEventListener("submit", authFormHandler, {once: true})

}

function authFormHandler (event){
    event.preventDefault()
    const email = event.target.querySelector( '#email').value
    const password = event.target.querySelector( '#password').value
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
}
function renderModalAfterAuth(content){
    console.log('Content',content)
}