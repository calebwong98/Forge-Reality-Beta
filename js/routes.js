import page from 'page';

import { navModule } from './navModule.js';
import { trackModule } from './trackModule.js';
// import { pageModule } from './pageModule.js';

// const pageIdMap = {
//   '/': 'track',
//   '/store': 'grid',
//   '/about': 'about',
// };

// // Add the beforeOut and afterIn event handlers
// page('*', function (ctx, next) {
//   const currentPage = document.querySelector('.current-page');
//   const nextPageId = pageIdMap[ctx.pathname];
//   const nextPage = document.getElementById(nextPageId);
//   if (nextPage) {
//     pageModule.beforeOut();
//     next();
//     pageModule.afterIn();
//   } else {
//     next('/');
//   }
// });
// page('*', function (ctx, next) {
//   const currentPage = document.querySelector('.current-page');
//   const nextPageId = pageIdMap[ctx.pathname];
//   const nextPage = document.getElementById(nextPageId);

//   if (nextPage) {
//     pageModule.beforeOut(currentPage, nextPage);

//     fetch(`/templates/${nextPageId}.html`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Failed to fetch ${nextPageId}.html`);
//         }
//         return response.text();
//       })
//       .then((html) => {
//         document.getElementById('main').innerHTML = html;
//         document.getElementById(nextPageId).classList.add('current-page');
//         pageModule.afterIn(currentPage, nextPage);
//       })
//       .catch((error) => {
//         console.error(error);
//         next('/');
//       });
//   } else {
//     next('/');
//   }
// });

page('/', home);
page('/store', store);
page('/about', about);
page('/start-project', startProject);
page('*', notFound);

page.start();

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

      // pageModule.init('track');
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

      // pageModule.init('grid');
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

      // pageModule.init('about');
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
