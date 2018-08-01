
const enBtn = document.getElementById('en');
enBtn.addEventListener('click', function(e) {
    window.localStorage.setItem('lang','en');
    var changeLang = window.localStorage.getItem('lang');
    fetch('/change/'+changeLang, {method: 'POST'});
});

const trBtn = document.getElementById('tr');
trBtn.addEventListener('click', function(e) {
    window.localStorage.setItem('lang','tr');
    var changeLang = window.localStorage.getItem('lang');
    fetch('/change/'+changeLang, {method: 'POST'});
});