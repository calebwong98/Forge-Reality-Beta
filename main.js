const body = document.body;
const track = document.getElementById('image-track');
const image = track.children;

const links = document.getElementById('links');
// const copyright = document.getElementById('copyright');

const home = document.getElementById('Home');
const gallery = document.getElementById('Gallery');
const store = document.getElementById('Store');
const about = document.getElementById('About');

const tablet = 880;
const mobile = 560;

let isImageSelected = true;
let lastScroll = 0;

// SELECT IMAGE
for (let i = 0; i < image.length; i++) {
  image[i].addEventListener('click', function (event) {
    // if (window.innerWidth < mobile) return;
    if (isImageSelected) return;

    // Use event.target to get the clicked image element
    const selectedImage = event.target;
    const order = Array.prototype.indexOf.call(image, selectedImage);

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
    if (i === order) {
      image[i].animate(
        {
          transform: `translate(0%, 0%)`,
        },
        {
          duration: 0,
          fill: 'forwards',
        }
      );
    }
    image[i].animate(
      {
        objectPosition: `${
          (100 + (track.dataset.imageOrder / (image.length - 1)) * -100) / 2 +
          (50 / (image.length - 1)) * i
        }% center`,
      },
      { duration: 500, fill: 'forwards' }
    );

    // Fade out social media links
    links.classList.add('fade-out');
    // copyright.classList.add('opacity-increase');
    // Highlight home
    if (i === 0) {
      home.classList.add('current');
      gallery.classList.remove('current');
    } else {
      home.classList.remove('current');
    }
    // Remove highlight
    // gallery.classList.remove('current');
    store.classList.remove('current');
    about.classList.remove('current');

    // Set the selected state to true
    isImageSelected = true;
  });
}

// FLIP IMAGE
function flipImage() {
  const quarterPoint = window.innerWidth / 4;
  const order = parseFloat(track.dataset.imageOrder);
  let nextOrder = 0;

  if (track.dataset.mouseDownAt > quarterPoint * 3) {
    nextOrder = order + 1;
  } else if (track.dataset.mouseDownAt < quarterPoint) {
    nextOrder = order - 1;
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
  image[nextOrder].animate(
    {
      objectPosition: `${
        (100 + (track.dataset.imageOrder / (image.length - 1)) * -100) / 2 +
        (50 / (image.length - 1)) * nextOrder
      }% center`,
    },
    { duration: 0, fill: 'forwards' }
  );

  home.classList.toggle('current', nextOrder === 0);
  gallery.classList.toggle('current', nextOrder !== 0);

  track.dataset.prevPercentage = (nextOrder / (image.length - 1)) * -100;
  track.dataset.percentage = track.dataset.prevPercentage;
  track.dataset.mouseDownAt = '0';
  isImageSelected = true;
}

// UNSELECT IMAGE
function deselectImage() {
  if (typeof track.dataset.imageOrder === 'undefined') return;
  for (let i = 0; i < image.length; i++) {
    track.dataset.percentage =
      (track.dataset.imageOrder / (image.length - 1)) * -100;

    track.dataset.prevPercentage = track.dataset.percentage;

    // Add "current" class to gallery link
    // Remove "current" class from all other links
    gallery.classList.add('current');
    home.classList.remove('current');
    store.classList.remove('current');
    about.classList.remove('current');

    // Remove the "selected" and "others" classes from all image
    image[i].classList.remove('selected');
    image[i].classList.remove('others');

    // Move the image track to the position where the selected image is at the screen center
    image[i].animate(
      {
        objectPosition: `${
          (100 + (track.dataset.imageOrder / (image.length - 1)) * -100) / 2 +
          (50 / (image.length - 1)) * i
        }% center`,
      },
      { duration: 100, fill: 'forwards' }
    );

    if (i !== track.dataset.imageOrder) {
      image[i].animate(
        {
          transform: `translate(${
            i * (100 + 10) - track.dataset.imageOrder * (100 + 10)
          }%, 0%)`,
        },
        { duration: 500, fill: 'forwards' }
      );
    } else {
      image[i].animate(
        {
          transform: `translate(${
            i * (100 + 10) - track.dataset.imageOrder * (100 + 10)
          }%, 0%)`,
        },
        { duration: 500, fill: 'forwards' }
      );
    }
  }

  // Fade in social media links
  links.classList.remove('fade-out');
  // copyright.classList.remove('opacity-increase');

  isImageSelected = false;
}

// MOUSEWHEEL SCROLL
function scrollImage(e) {
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
    image[i].animate(
      {
        transform: `translate(${
          i * (100 + 10) -
          (image.length - 1) * ((-nextPercentage / 100) * (100 + 10))
        }%, 0%)`,
        objectPosition: `${
          (100 + nextPercentage) / 2 + (50 / (image.length - 1)) * i
        }% center`,
      },
      { duration: 1200, fill: 'both' }
    );
  }
}

// MOUSEDRAG SCROLL
function mouseDownAt(e) {
  track.dataset.mouseDownAt = e.clientX;
}

function mouseUp() {
  track.dataset.mouseDownAt = '0';
  track.dataset.prevPercentage = track.dataset.percentage;
}

function dragImage(e) {
  if (track.dataset.mouseDownAt === '0' || isImageSelected === true) return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  for (let i = 0; i < image.length; i++) {
    image[i].animate(
      {
        transform: `translate(${
          i * (100 + 10) -
          (image.length - 1) * ((-nextPercentage / 100) * (100 + 10))
        }%, 0%)`,
        objectPosition: `${
          (100 + nextPercentage) / 2 + (50 / (image.length - 1)) * i
        }% center`,
      },
      { duration: 1200, fill: 'forwards' }
    );
  }
}

// TOUCHDRAG SCROLL
function touchStart(e) {
  track.dataset.mouseDownAt = e.touches[0].clientX;
}

function touchEnd() {
  track.dataset.mouseDownAt = '0';
  track.dataset.prevPercentage = track.dataset.percentage;
}

function touchMove(e) {
  if (track.dataset.mouseDownAt === '0' || isImageSelected === true) return;

  const mouseDelta =
      parseFloat(track.dataset.mouseDownAt) - e.touches[0].clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  for (let i = 0; i < image.length; i++) {
    image[i].animate(
      {
        transform: `translate(${
          i * (100 + 10) -
          (image.length - 1) * ((-nextPercentage / 100) * (100 + 10))
        }%, 0%)`,
        objectPosition: `${
          (100 + nextPercentage) / 2 + (50 / (image.length - 1)) * i
        }% center`,
      },
      { duration: 1200, fill: 'forwards' }
    );
  }
}

// checkbox.addEventListener('change', function () {
//   if (this.checked) {
//     header.classList.remove('overlay-light');
//     header.classList.add('overlay-dark');
//   } else {
//     header.classList.remove('overlay-dark');
//     header.classList.add('overlay-light');
//   }

//   // if (this.checked) {
//   //   body.style.overflow = 'hidden';
//   //   // header.style.paddingRight = `${scrollbarWidth}px`;
//   // } else {
//   //   // on closing modal
//   //   body.style.overflow = 'unset';
//   //   // header.style.paddingRight = '0px';
//   // }
// });

// EVENT LISTENER
window.addEventListener('wheel', function (e) {
  if (window.innerWidth) {
    if (isImageSelected) {
      deselectImage();
    } else {
      scrollImage(e);
    }
  }
});
gallery.onclick = function () {
  if (window.innerWidth) {
    deselectImage();
  }
};

// Desktop
track.addEventListener('mousedown', function (e) {
  if (window.innerWidth) {
    if (isImageSelected) {
      mouseDownAt(e);
    } else {
      mouseDownAt(e);
    }
  }
});
track.addEventListener('mouseup', function () {
  if (window.innerWidth) {
    if (isImageSelected) {
      return;
    } else {
      mouseUp();
    }
  }
});
window.addEventListener('mousemove', function (e) {
  if (window.innerWidth) {
    if (isImageSelected) {
      return;
    } else {
      dragImage(e);
    }
  }
});
// Mobile
track.addEventListener('touchstart', function (e) {
  if (window.innerWidth) {
    if (isImageSelected) {
      touchStart(e);
    } else {
      touchStart(e);
    }
  }
});
track.addEventListener('touchend', function () {
  if (window.innerWidth) {
    if (isImageSelected) {
      return;
    } else {
      touchEnd();
    }
  }
});
window.addEventListener('touchmove', function (e) {
  if (window.innerWidth) {
    if (isImageSelected) {
      return;
    } else {
      touchMove(e);
    }
  }
});

track.addEventListener('mouseup', function () {
  if (window.innerWidth) {
    if (isImageSelected) {
      flipImage();
    } else {
      return;
    }
  }
});

// window.addEventListener('scroll', () => {
//   const currentScroll = window.scrollY;

//   if (currentScroll <= 0) {
//     body.classList.remove('remove-overlay-top');
//   }

//   if (currentScroll > 0 && currentScroll > lastScroll) {
//     body.classList.add('remove-overlay-top');
//   }

//   if (
//     currentScroll < lastScroll &&
//     body.classList.contains('remove-overlay-top')
//   ) {
//     body.classList.remove('remove-overlay-top');
//   }

//   lastScroll = currentScroll;
// });
