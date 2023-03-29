const track = document.getElementById('image-track');
const image = track.children;
let isImageSelected = false;

// Select & Unselect Image
for (let i = 0; i < image.length; i++) {
  image[i].addEventListener('click', function (event) {
    if (isImageSelected) return;

    // Use event.target to get the clicked image element
    const selectedImage = event.target;
    const order = Array.prototype.indexOf.call(image, selectedImage);

    track.dataset.imageOrder = order;

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

      track.dataset.percentage = (order / (image.length - 1)) * -100;

      track.dataset.prevPercentage = track.dataset.percentage;
    }

    // Set the selected state to true
    isImageSelected = true;
  });
}

// Remove the "selected" and "others" classes from all image
// Scroll the image track to the position where the selected image is at the center
function deselectImage() {
  if (typeof track.dataset.imageOrder === 'undefined') return;
  for (let i = 0; i < image.length; i++) {
    image[i].classList.remove('selected');
    image[i].classList.remove('others');

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
        { duration: 1200, fill: 'forwards' }
      );
    }
  }

  track.dataset.percentage =
    (track.dataset.imageOrder / (image.length - 1)) * -100;

  track.dataset.prevPercentage = track.dataset.percentage;

  isImageSelected = false;
}

// Mouse Wheel Scroll
function scrollImage(e) {
  const wheelDelta = e.deltaY,
    maxDelta = window.innerWidth;

  const percentage = (wheelDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.dataset.prevPercentage = track.dataset.percentage;

  for (let i = 0; i < image.length; i++) {
    image[i].animate(
      {
        transform: `translate(${
          i * (100 + 10) -
          (image.length - 1) * ((-nextPercentage / 100) * (100 + 10))
        }%, 0%)`,
        objectPosition: `${
          (110 + (nextPercentage + 10)) / 2 - 25 * i + 50 * i
        }% center`,
        // objectPosition: `${100 + nextPercentage + 50}% center`,
      },
      { duration: 1200, fill: 'both' }
    );

    // console.log((100 + nextPercentage) / 2 - 25 * i);
  }
}

// Mouse Drag Scroll
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
        objectPosition: `${(100 + nextPercentage) / 2 + 25}% center`,
      },
      { duration: 1200, fill: 'forwards' }
    );
  }
}

// Event Listeners
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
