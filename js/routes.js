(function () {
  // private api

  var cache = {};

  function get(url, cb) {
    if (cache[url]) return cb(cache[url]);
    $.ajax({
      url: url,
      success: function (data) {
        cache[url] = data;
        cb(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
      },
      dataType: 'text',
    });
  }

  // public api

  window.init = {
    ctx: function (ctx, next) {
      ctx.data = {};
      ctx.partials = {};
      next();
    },
  };

  window.route = {
    home: function (ctx, next) {
      get('templates/home.html', function (html) {
        ctx.data.index = 0;
        ctx.partials.content = html;
        next();
      });
    },
    portfolio: function (ctx, next) {
      get('templates/store.html', function (html) {
        ctx.data.index = 1;
        ctx.partials.content = html;
        next();
      });
    },
    about: function (ctx, next) {
      get('templates/about.html', function (html) {
        ctx.data.index = 2;
        ctx.partials.content = html;
        next();
      });
    },
  };

  window.render = {
    content: function (ctx, next) {
      get('templates/content.html', function (html) {
        var template = Hogan.compile(html),
          content = template.render(ctx.data, ctx.partials);
        //
        $('#content').empty().append(content);
        changeActive(ctx.data.index);
        if (typeof done === 'function') done(ctx.data.index);
      });
    },
  };

  window.done = null;
})();

// function home() {
//   fetch('/templates/home.html')
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch home.html: ${response.status} ${response.statusText}`
//         );
//       }
//       return response.text();
//     })
//     .then((html) => {
//       document.getElementById('main').innerHTML = html;
//     })
//     .catch((error) => {
//       console.error(error); // Log the error to the console
//       // Display an error message to the user or redirect to an error page
//       document.getElementById('main').innerHTML =
//         'Failed to load the home page. Please try again later.';
//     });
// }

// function store() {
//   fetch('/templates/store.html')
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch store.html: ${response.status} ${response.statusText}`
//         );
//       }
//       return response.text();
//     })
//     .then((html) => {
//       document.getElementById('main').innerHTML = html;
//     })
//     .catch((error) => {
//       console.error(error); // Log the error to the console
//       // Display an error message to the user or redirect to an error page
//       document.getElementById('main').innerHTML =
//         'Failed to load the store page. Please try again later.';
//     });
// }

// function about() {
//   fetch('/templates/about.html')
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch about.html: ${response.status} ${response.statusText}`
//         );
//       }
//       return response.text();
//     })
//     .then((html) => {
//       document.getElementById('main').innerHTML = html;
//     })
//     .catch((error) => {
//       console.error(error); // Log the error to the console
//       // Display an error message to the user or redirect to an error page
//       document.getElementById('main').innerHTML =
//         'Failed to load the about page. Please try again later.';
//     });
// }

// function notFound() {
//   // Fetch the HTML template for the 404 page
//   fetch('/templates/404.html')
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Failed to fetch 404 page template');
//       }
//       return response.text();
//     })
//     .then((html) => {
//       // Update the DOM with the 404 page content
//       document.getElementById('main').innerHTML = html;
//     })
//     .catch((error) => {
//       // Handle any errors that occur during fetching or updating the DOM
//       console.error('Failed to load 404 page:', error);
//     });
// }

// // Define routes
// page('/', home);
// page('/store', store);
// page('/about', about);

// // Set up default route
// page('*', notFound);
