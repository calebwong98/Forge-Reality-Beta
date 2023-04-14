var navModule = (function () {
  // Private function to operate navigation
  function selectedNav(home, gallery, store, about) {
    // Remove previous highlight
    home.classList.remove('current');
    gallery.classList.remove('current');
    store.classList.remove('current');
    about.classList.remove('current');
  }

  function toggleCheck(check) {
    if (!check.checked) return;
    check.checked = !check.checked;
  }

  // Public function to initialize the module
  function init(current) {
    const logo = document.getElementById('logo');
    const check = document.getElementById('check');
    const links = document.getElementById('links');
    const footer = document.getElementById('footer');

    const home = document.getElementById('Home');
    const gallery = document.getElementById('Gallery');
    const store = document.getElementById('Store');
    const about = document.getElementById('About');

    if (current === 'home') {
      home.classList.add('current');
      links.classList.remove('fade-in');
      footer.classList.remove('fade-out');
    }
    if (current === 'store') {
      store.classList.add('current');
      links.classList.add('fade-in');
      footer.classList.remove('fade-out');
    }
    if (current === 'about') {
      about.classList.add('current');
      footer.classList.add('fade-out');
    }

    logo.onclick = function () {
      selectedNav(home, gallery, store, about);
      home.classList.add('current');
      toggleCheck(check);
    };

    home.onclick = function () {
      selectedNav(home, gallery, store, about);
      home.classList.add('current');
      toggleCheck(check);
    };

    gallery.onclick = function () {
      if (window.location.pathname !== '/') {
        gallery.setAttribute('href', '/');
        sessionStorage.setItem('deselectImage', 'true');
        // gallery.removeAttribute('href');
        toggleCheck(check);
      }
    };

    store.onclick = function () {
      selectedNav(home, gallery, store, about);
      store.classList.add('current');
      toggleCheck(check);
    };

    about.onclick = function () {
      selectedNav(home, gallery, store, about);
      about.classList.add('current');
      toggleCheck(check);
    };
  }

  return {
    init: init,
  };
})();

// Export the module
export { navModule };
