var trackModule = (function () {
  // Private function to operate image track
  // SELECT IMAGE
  function selectImage(
    track,
    image,
    order,
    links,
    home,
    gallery,
    about,
    store
  ) {
    // Use order to get the selected image element
    const selectedImage = image[order];

    track.dataset.imageOrder = order;
    track.dataset.percentage = (order / (image.length - 1)) * -100;
    track.dataset.prevPercentage = track.dataset.percentage;

    // Animate the width and clip height of selected element to full screen
    selectedImage.classList.add('selected');

    // Remove the "selected" class from other image elements
    for (let i = 0; i < image.length; i++) {
      if (i !== order) {
        image[i].classList.remove('selected');
      }
    }

    // Animate the clip height of elements other than selected to 0
    for (let i = 0; i < image.length; i++) {
      if (i !== order) {
        image[i].classList.add('others');
      } else {
        image[i].classList.remove('others');
      }
    }
    image[order].animate(
      {
        transform: `translate(0%, 0%)`,
      },
      {
        duration: 0,
        fill: 'forwards',
      }
    );

    const img = image[order].querySelector('img');
    img.animate(
      {
        objectPosition: `center`,
      },
      { duration: 0, fill: 'forwards' }
    );

    // Highlight home
    if (order === 0) {
      home.classList.add('current');
      gallery.classList.remove('current');
    } else {
      home.classList.remove('current');
    }
    // Remove highlight
    gallery.classList.remove('current');
    store.classList.remove('current');
    about.classList.remove('current');

    // Remove social media links
    links.classList.remove('fade-in');
  }

  // TOGGLE MENU
  function toggleCheck(check) {
    check.checked = !check.checked;
  }

  // FLIP IMAGE
  function flipImage(track, image, home) {
    const quarterPoint = window.innerWidth / 4;
    const imageOrder = parseFloat(track.dataset.imageOrder);
    let nextOrder = 0;

    if (track.dataset.mouseDownAt > quarterPoint * 3) {
      nextOrder = imageOrder + 1;
    } else if (track.dataset.mouseDownAt < quarterPoint) {
      nextOrder = imageOrder - 1;
    } else return;

    if (nextOrder < 0 || nextOrder >= image.length) {
      track.dataset.mouseDownAt = '0';
      return;
    }

    track.dataset.imageOrder = nextOrder;

    // Animate the width and clip height of selected element to full screen
    image[nextOrder].classList.add('selected');
    // Remove the "selected" class from other image elements
    for (let i = 0; i < image.length; i++) {
      if (i !== nextOrder) {
        image[i].classList.remove('selected');
      }
    }
    // Animate the clip height of elements other than selected to 0
    for (let i = 0; i < image.length; i++) {
      if (i !== nextOrder) {
        image[i].classList.add('others');
      } else if (i === nextOrder) {
        image[i].classList.remove('others');
      }
    }
    image[nextOrder].animate(
      {
        transform: `translate(0%, 0%)`,
      },
      {
        duration: 0,
        fill: 'forwards',
      }
    );
    const img = image[nextOrder].querySelector('img');
    img.animate(
      {
        objectPosition: `center`,
      },
      { duration: 0, fill: 'forwards' }
    );

    home.classList.toggle('current', nextOrder === 0);
    // gallery.classList.toggle('current', nextOrder !== 0);

    track.dataset.prevPercentage = (nextOrder / (image.length - 1)) * -100;
    track.dataset.percentage = track.dataset.prevPercentage;
    track.dataset.mouseDownAt = '0';
  }

  // DESELECT IMAGE
  function deselectImage(track, image, gallery, home, store, about, links) {
    if (typeof track.dataset.imageOrder === 'undefined') return;
    for (let i = 0; i < image.length; i++) {
      const img = image[i].querySelector('img');
      track.dataset.percentage =
        (track.dataset.imageOrder / (image.length - 1)) * -100;

      track.dataset.prevPercentage = track.dataset.percentage;

      // Add "current" class to gallery
      // Remove "current" class from all other nav
      gallery.classList.add('current');
      home.classList.remove('current');
      store.classList.remove('current');
      about.classList.remove('current');

      // Remove the "selected" and "others" classes from all image
      image[i].classList.remove('selected');
      image[i].classList.remove('others');

      // Move the image track to the position where the selected image is at the screen center
      img.animate(
        {
          objectPosition: `${
            (100 + (track.dataset.imageOrder / (image.length - 1)) * -100) / 2 +
            (50 / (image.length - 1)) * i
          }% center`,
        },
        { duration: 0, fill: 'forwards' }
      );

      if (i !== track.dataset.imageOrder) {
        image[i].animate(
          {
            transform: `translate(${
              i * (100 + 10) - track.dataset.imageOrder * (100 + 10)
            }%, 0%)`,
          },
          { duration: 0, fill: 'forwards' }
        );
      } else {
        image[i].animate(
          {
            transform: `translate(${
              i * (100 + 10) - track.dataset.imageOrder * (100 + 10)
            }%, 0%)`,
          },
          { duration: 0, fill: 'forwards' }
        );
      }
    }

    // Fade in social media links
    links.classList.add('fade-in');
  }

  // MOUSEWHEEL SCROLL
  function scrollImage(e, track, image) {
    // Calculate percentage of wheel scrolled
    const wheelDelta = e.deltaY,
      maxDelta = window.innerWidth;

    const percentage = (wheelDelta / maxDelta) * -100,
      nextPercentageUnconstrained =
        parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.dataset.prevPercentage = track.dataset.percentage;

    // TranslateX each image and inner image position
    for (let i = 0; i < image.length; i++) {
      const img = image[i].querySelector('img');
      image[i].animate(
        {
          transform: `translate(${
            i * (100 + 10) -
            (image.length - 1) * ((-nextPercentage / 100) * (100 + 10))
          }%, 0%)`,
        },
        { duration: 1200, fill: 'both' }
      );
      img.animate(
        {
          objectPosition: `${
            (100 + nextPercentage) / 2 + (50 / (image.length - 1)) * i
          }% center`,
        },
        { duration: 1200, fill: 'both' }
      );
    }
  }

  // MOUSEDRAG SCROLL
  function mouseDownAt(track, e) {
    track.dataset.mouseDownAt = e.clientX;
  }
  function mouseUp(track) {
    track.dataset.mouseDownAt = '0';
    track.dataset.prevPercentage = track.dataset.percentage;
  }
  function dragImage(track, image, e) {
    if (track.dataset.mouseDownAt === '0') return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained =
        parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    for (let i = 0; i < image.length; i++) {
      const img = image[i].querySelector('img');
      image[i].animate(
        {
          transform: `translate(${
            i * (100 + 10) -
            (image.length - 1) * ((-nextPercentage / 100) * (100 + 10))
          }%, 0%)`,
        },
        { duration: 1200, fill: 'both' }
      );
      img.animate(
        {
          objectPosition: `${
            (100 + nextPercentage) / 2 + (50 / (image.length - 1)) * i
          }% center`,
        },
        { duration: 1200, fill: 'both' }
      );
    }
  }

  // TOUCHDRAG SCROLL
  function touchStart(track, e) {
    track.dataset.mouseDownAt = e.touches[0].clientX;
  }
  function touchEnd(track) {
    track.dataset.mouseDownAt = '0';
    track.dataset.prevPercentage = track.dataset.percentage;
  }
  function touchMove(track, image, e) {
    if (track.dataset.mouseDownAt === '0') return;

    const mouseDelta =
        parseFloat(track.dataset.mouseDownAt) - e.touches[0].clientX,
      maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained =
        parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    for (let i = 0; i < image.length; i++) {
      const img = image[i].querySelector('img');
      image[i].animate(
        {
          transform: `translate(${
            i * (100 + 10) -
            (image.length - 1) * ((-nextPercentage / 100) * (100 + 10))
          }%, 0%)`,
        },
        { duration: 1200, fill: 'both' }
      );
      img.animate(
        {
          objectPosition: `${
            (100 + nextPercentage) / 2 + (50 / (image.length - 1)) * i
          }% center`,
        },
        { duration: 1200, fill: 'both' }
      );
    }
  }

  // Public function to initialize the module
  function init() {
    // const body = document.body;
    const track = document.getElementById('track');
    const image = track.children;

    // const menu = document.getElementById('menu');
    const menuCheck = document.getElementById('menuCheck');
    const overlayCheck = document.getElementById('overlayCheck');
    const buttonOverlay = document.getElementById('button-overlay');

    const links = document.getElementById('links');
    const footer = document.getElementById('footer');

    const home = document.getElementById('Home');
    const gallery = document.getElementById('Gallery');
    const store = document.getElementById('Store');
    const about = document.getElementById('About');

    // const tablet = 880;
    // const mobile = 560;

    let isImageSelected = true;

    // EVENT LISTENER

    track.addEventListener('wheel', function (e) {
      if (isImageSelected) {
        deselectImage(track, image, gallery, home, store, about, links);
        isImageSelected = false;
      } else {
        scrollImage(e, track, image);
      }
    });

    gallery.onclick = function (e) {
      e.preventDefault();
      overlayCheck.checked = false;
      footer.classList.remove('fade-out');
      buttonOverlay.classList.remove('clicked');

      toggleCheck(menuCheck);
      deselectImage(track, image, gallery, home, store, about, links);
      isImageSelected = false;
    };
    if (sessionStorage.getItem('deselectImage') === 'true') {
      // Call the deselectImage function
      deselectImage(track, image, gallery, home, store, about, links);
      isImageSelected = false;
      // Clear the flag in sessionStorage
      sessionStorage.removeItem('deselectImage');
    }

    // Desktop
    track.addEventListener('mousedown', function (e) {
      if (isImageSelected) {
        mouseDownAt(track, e);
      } else {
        mouseDownAt(track, e);
      }
    });

    window.addEventListener('mouseup', function () {
      mouseUp(track);
    });
    track.addEventListener('mouseup', function () {
      if (isImageSelected) {
        flipImage(track, image, home);
      }
    });
    window.addEventListener('mousemove', function (e) {
      if (!isImageSelected) {
        dragImage(track, image, e);
      } else {
        return;
      }
    });
    // Mobile
    track.addEventListener('touchstart', function (e) {
      if (isImageSelected) {
        track.dataset.mouseDownAtY = e.touches[0].clientY;
        // touchStart(track, e);
      } else {
        touchStart(track, e);
      }
    });
    track.addEventListener('touchend', function (e) {
      if (isImageSelected) {
        console.log(e.changedTouches[0].clientY);
        if (track.dataset.mouseDownAtY - e.changedTouches[0].clientY > 200) {
          deselectImage(track, image, gallery, home, store, about, links);
          isImageSelected = false;
          track.dataset.mouseDownAtY = 0;
        } else {
          track.dataset.mouseDownAtY = 0;
          touchEnd(track);
        }
      } else {
        touchEnd(track);
      }
    });
    window.addEventListener('touchmove', function (e) {
      if (isImageSelected) {
        return;
      } else {
        touchMove(track, image, e);
      }
    });

    for (let i = 0; i < image.length; i++) {
      image[i].children[0].addEventListener('click', function (event) {
        if (isImageSelected) return;
        // Use event.target to get the clicked image element
        const selectedImage = event.target.parentNode;
        const order = Array.prototype.indexOf.call(image, selectedImage);
        if (order == -1) return;
        selectImage(track, image, order, links, home, gallery, about, store);
        isImageSelected = true;
      });
    }
  }

  // Export public functions
  return {
    init: init,
  };
})();

// Export the module
export { trackModule };
