const pageModule = {
  beforeOut: function () {
    // Add the 'out' class to the current page element
    const currentPage = document.querySelector('.current-page');
    // console.log(currentPage);
    // currentPage.classList.add('out');
  },
  afterIn: function () {
    // Remove the 'out' class from all page elements
    // const pages = document.querySelectorAll('.page');
    // pages.forEach((page) => {
    //   page.classList.remove('out');
    //   console.log(page);
    // });
    // console.log(pageModule.currentPageName);
    // Add the 'current-page' class to the new page element
    // const currentPage = document.querySelector('.current-page');
    // currentPage.classList.remove('current-page');
    // const newPage = document.getElementById(pageModule.currentPageName);
    // newPage.classList.add('current-page');
    // console.log(currentPage);
    // console.log(newPage);
  },
  init: function (getCurrentPageName) {
    // Set the current page name when the page is initialized
    pageModule.currentPageName = getCurrentPageName;
  },
};

// Export the module
export { pageModule };
