
const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href ='/trabajo-final/index.html'
}

const logout = document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    alert('Hasta pronto!')
    localStorage.removeItem('login_success')
    window.location.href ='/trabajo-final/index.html'
})