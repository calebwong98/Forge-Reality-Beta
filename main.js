const track = document.getElementById('image-track');
const image = track.children;
let isImageSelected = false;

// SELECT IMAGE
for (let i = 0; i < image.length; i++) {
  image[i].addEventListener('click', function (event) {
    if (isImageSelected) return;

    // Use event.target to get the clicked image element
    const selectedImage = event.target;
    const order = Array.prototype.indexOf.call(image, selectedImage);

    track.dataset.imageOrder = order;
    track.dataset.percentage = (order / (image.length - 1)) * -100;
    track.dataset.prevPercentage = track.dataset.percentage;

    // Add the "selected" class to the selected child element
    selectedImage.classList.add('selected');

    // Remove the "selected" class from other image elements
    for (let i = 0; i < image.length; i++) {
      if (i !== order) {
        image[i].classList.remove('selected');
      }
    }
    // Modify the style of other child elements
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
          duration: 500,
          fill: 'forwards',
        }
      );
    }

    // Set the selected state to true
    isImageSelected = true;
  });
}

// UNSELECT IMAGE
// Remove the "selected" and "others" classes from all image
// Move the image track to the position where the selected image is at the center
function deselectImage() {
  if (typeof track.dataset.imageOrder === 'undefined') return;
  for (let i = 0; i < image.length; i++) {
    track.dataset.percentage =
      (track.dataset.imageOrder / (image.length - 1)) * -100;

    track.dataset.prevPercentage = track.dataset.percentage;

    image[i].classList.remove('selected');
    image[i].classList.remove('others');

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
        { duration: 100, fill: 'forwards' }
      );
    } else {
      image[i].animate(
        {
          transform: `translate(${
            i * (100 + 10) - track.dataset.imageOrder * (100 + 10)
          }%, 0%)`,
        },
        { duration: 100, fill: 'forwards' }
      );
    }
  }

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
  if (track.dataset.mouseDownAt === '0') return;

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
  if (isImageSelected) {
    deselectImage();
  } else {
    scrollImage(e);
  }
});
window.addEventListener('mousedown', function (e) {
  if (isImageSelected) {
    return;
  } else {
    mouseDownAt(e);
  }
});
window.addEventListener('mouseup', function () {
  if (isImageSelected) {
    return;
  } else {
    mouseUp();
  }
});
window.addEventListener('mousemove', function (e) {
  if (isImageSelected) {
    return;
  } else {
    dragImage(e);
  }
});
