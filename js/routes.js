import page from 'page';

// Define routes and their associated controllers
// const routes = {
//   '/': home,
//   '/store': store,
//   '/about': about,
//   // ... other routes
//   '*': notFound,
// };

function home() {
  fetch('/templates/home.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch home.html: ${response.status} ${response.statusText}`
        );
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById('main').innerHTML = html;
    })
    .catch((error) => {
      console.error(error); // Log the error to the console
      // Display an error message to the user or redirect to an error page
      document.getElementById('main').innerHTML =
        'Failed to load the home page. Please try again later.';
    });
}
function store() {
  fetch('/templates/store.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch store.html: ${response.status} ${response.statusText}`
        );
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById('main').innerHTML = html;
    })
    .catch((error) => {
      console.error(error); // Log the error to the console
      // Display an error message to the user or redirect to an error page
      document.getElementById('main').innerHTML =
        'Failed to load the store page. Please try again later.';
    });
}
function about() {
  fetch('/templates/about.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch about.html: ${response.status} ${response.statusText}`
        );
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById('main').innerHTML = html;
    })
    .catch((error) => {
      console.error(error); // Log the error to the console
      // Display an error message to the user or redirect to an error page
      document.getElementById('main').innerHTML =
        'Failed to load the about page. Please try again later.';
    });
}
function notFound() {
  // Fetch the HTML template for the 404 page
  fetch('/templates/404.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch 404 page template');
      }
      return response.text();
    })
    .then((html) => {
      // Update the DOM with the 404 page content
      document.getElementById('main').innerHTML = html;
    })
    .catch((error) => {
      // Handle any errors that occur during fetching or updating the DOM
      console.error('Failed to load 404 page:', error);
    });
}

// Define routes
page('/', home);
page('/store', store);
page('/about', about);

// Set up default route
page('*', notFound);
