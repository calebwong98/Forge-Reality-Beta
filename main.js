import page from 'page';
import './js/routes';
import './js/track';

// Start Page.js
page.start();

// Handle URL changes
window.addEventListener('popstate', function (event) {
  // Call the Page.js dispatch function to handle the URL change
  page.dispatch(event.state.path);
});
