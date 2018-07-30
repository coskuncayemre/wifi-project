
const button = document.getElementById('en');
button.addEventListener('click', function(e) {
    window.localStorage.setItem('lang','en');
    var changeLang = window.localStorage.getItem('lang');
    fetch('/change/'+changeLang, {method: 'POST'})
});

const button2 = document.getElementById('tr');
button2.addEventListener('click', function(e) {
    window.localStorage.setItem('lang','tr');
    var changeLang = window.localStorage.getItem('lang');
    fetch('/change/'+changeLang, {method: 'POST'})
});