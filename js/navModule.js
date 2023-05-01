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
    const menuCheck = document.getElementById('menuCheck');
    const links = document.getElementById('links');
    const footer = document.getElementById('footer');

    const home = document.getElementById('Home');
    const gallery = document.getElementById('Gallery');
    const store = document.getElementById('Store');
    const about = document.getElementById('About');

    const buttonOverlay = document.getElementById('button-overlay');
    const buttonMenu = document.getElementById('button-menu');
    const overlayCheck = document.getElementById('overlayCheck');
    const main = document.getElementById('main');

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
      overlayCheck.checked = false;
      buttonOverlay.classList.remove('clicked');

      selectedNav(home, gallery, store, about);
      home.classList.add('current');
      toggleCheck(menuCheck);
    };

    home.onclick = function () {
      overlayCheck.checked = false;
      buttonOverlay.classList.remove('clicked');

      selectedNav(home, gallery, store, about);
      home.classList.add('current');
      toggleCheck(menuCheck);
    };

    gallery.onclick = function () {
      if (window.location.pathname !== '/') {
        overlayCheck.checked = false;
        buttonOverlay.classList.remove('clicked');

        gallery.setAttribute('href', '/');
        sessionStorage.setItem('deselectImage', 'true');
        toggleCheck(menuCheck);
      }
    };

    store.onclick = function () {
      overlayCheck.checked = false;
      buttonOverlay.classList.remove('clicked');

      selectedNav(home, gallery, store, about);
      store.classList.add('current');
      toggleCheck(menuCheck);
    };

    about.onclick = function () {
      overlayCheck.checked = false;
      buttonOverlay.classList.remove('clicked');

      selectedNav(home, gallery, store, about);
      about.classList.add('current');
      toggleCheck(menuCheck);
    };

    // Overlay
    buttonOverlay.onclick = function () {
      toggleCheck(menuCheck);
      if (!overlayCheck.checked) {
        overlayCheck.checked = !overlayCheck.checked;
        buttonOverlay.classList.add('clicked');

        // links.classList.remove('fade-in');
        footer.classList.add('fade-out');
      } else {
        overlayCheck.checked = !overlayCheck.checked;
        buttonOverlay.classList.remove('clicked');
        if (current !== 'about') {
          footer.classList.remove('fade-out');
        }
      }
    };
    buttonMenu.onclick = function () {
      toggleCheck(menuCheck);
      if (!overlayCheck.checked) {
        overlayCheck.checked = !overlayCheck.checked;
        buttonOverlay.classList.add('clicked');
        footer.classList.add('fade-out');
      }
    };
  }

  return {
    init: init,
  };
})();

// Export the module
export { navModule };
