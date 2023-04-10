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
    console.log(check.checked);
    if (!check.checked) return;
    check.checked = !check.checked;
  }

  // Public function to initialize the module
  function init() {
    const logo = document.getElementById('logo');
    const check = document.getElementById('check');
    const links = document.getElementById('links');
    const copyright = document.getElementById('copyright');

    const home = document.getElementById('Home');
    const gallery = document.getElementById('Gallery');
    const store = document.getElementById('Store');
    const about = document.getElementById('About');

    logo.onclick = function () {
      links.classList.remove('fade-in');
      copyright.classList.remove('fade-out');

      selectedNav(home, gallery, store, about);
      home.classList.add('current');
      toggleCheck(check);
    };

    home.onclick = function () {
      links.classList.remove('fade-in');
      copyright.classList.remove('fade-out');

      selectedNav(home, gallery, store, about);
      this.classList.add('current');
      toggleCheck(check);
    };

    store.onclick = function () {
      links.classList.add('fade-in');
      copyright.classList.remove('fade-out');
      selectedNav(home, gallery, store, about);
      this.classList.add('current');
      toggleCheck(check);
    };

    about.onclick = function () {
      links.classList.remove('fade-in');
      copyright.classList.add('fade-out');
      selectedNav(home, gallery, store, about);
      this.classList.add('current');
      toggleCheck(check);
    };
  }

  return {
    init: init,
  };
})();

// Export the module
export { navModule };
