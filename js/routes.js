import page from 'page';

import { navModule } from './navModule.js';
import { trackModule } from './trackModule.js';

// Render Home & Gallery Page
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
      navModule.init('home');
      document.getElementById('main').innerHTML = html;
      trackModule.init();
    })
    .catch((error) => {
      console.error(error); // Log the error to the console
      // Display an error message to the user or redirect to an error page
      document.getElementById('main').innerHTML =
        'Failed to load the home page. Please try again later.';
    });
}

// Render Store Page
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
      navModule.init('store');
      document.getElementById('main').innerHTML = html;
    })
    .catch((error) => {
      console.error(error); // Log the error to the console
      // Display an error message to the user or redirect to an error page
      document.getElementById('main').innerHTML =
        'Failed to load the store page. Please try again later.';
    });
}

// Render About Page
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
      navModule.init('about');
      document.getElementById('main').innerHTML = html;
    })
    .catch((error) => {
      console.error(error); // Log the error to the console
      // Display an error message to the user or redirect to an error page
      document.getElementById('main').innerHTML =
        'Failed to load the about page. Please try again later.';
    });
}

// Render Start Project Page
function startProject() {
  fetch('/templates/start-project.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch about.html: ${response.status} ${response.statusText}`
        );
      }
      return response.text();
    })
    .then((html) => {
      navModule.init();
      document.getElementById('main').innerHTML = html;
    })
    .catch((error) => {
      console.error(error); // Log the error to the console
      // Display an error message to the user or redirect to an error page
      document.getElementById('main').innerHTML =
        'Failed to load the about page. Please try again later.';
    });
}

// Render 404 not found Page
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

// page('*', function (ctx, next) {
//   if (ctx.init) {
//     next();
//   } else {
//     document.getElementById('main').classList.add('page-load');
//     setTimeout(function () {
//       document.getElementById('main').classList.remove('page-load');
//       next();
//     }, 1000);
//   }
// });
// function pageTransition(ctx, next) {
//   if (ctx.init) {
//     next();
//   } else {
//     document.getElementById('track').classList.add('page-load');
//     console.log('hello');
//     next();

//     setTimeout(function () {
//       document.getElementById('track').classList.remove('page-load');
//       console.log('bye');
//       // next();
//     }, 1000);
//   }
// }

// page.base('/', home);
// page('*', store);
page('/', home);
page('/store', store);
page('/about', about);
page('/start-project', startProject);
page('*', notFound);
