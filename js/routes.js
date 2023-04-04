import page from 'page';

const routes = {
  '/': home,
  '/store': store,
  '/about': about,
};

function home() {
  fetch('/templates/home.html')
    .then((response) => response.text())
    .then((html) => {
      document.getElementById('app').innerHTML = html;
    });
}

function store() {
  fetch('/templates/store.html')
    .then((response) => response.text())
    .then((html) => {
      document.getElementById('app').innerHTML = html;
    });
}
function about() {
  fetch('/templates/about.html')
    .then((response) => response.text())
    .then((html) => {
      document.getElementById('app').innerHTML = html;
    });
}
