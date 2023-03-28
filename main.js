const track = document.getElementById('image-track');
const image = track.children;
const imageOrder = track.dataset.imageOrder;
let isImageSelected = false;

// Select & Unselect Image
for (let i = 0; i < image.length; i++) {
  image[i].addEventListener('click', function (event) {
    if (isImageSelected) return;

    // Use event.target to get the clicked image element
    const selectedImage = event.target;
    const imageOrder = Array.prototype.indexOf.call(image, selectedImage);

    track.dataset.imageOrder = imageOrder;

    // Add the "selected" class to the selected child element
    selectedImage.classList.add('selected');

    // Remove the "selected" class from other image elements
    for (let i = 0; i < image.length; i++) {
      if (i !== imageOrder) {
        image[i].classList.remove('selected');
      }
    }
    // Modify the style of other child elements
    for (let i = 0; i < image.length; i++) {
      if (i !== imageOrder) {
        image[i].classList.add('others');
      } else {
        image[i].classList.remove('others');
      }
    }

    // if (i !== imageOrder) {
    //   image[i].animate(
    //     {
    //       // transform: `translate(${
    //       //   i * (100 + 10) - track.dataset.imageOrder * (100 + 10)
    //       // }%, 0%)`,
    //       height: `0`,
    //     },
    //     { duration: 0, fill: 'forwards' }
    //   );
    // } else {
    //   image[i].animate(
    //     {
    //       height: `100%`,
    //       width: `100%`,
    //       transform: `translate(0, 0)`,
    //     },
    //     { duration: 1200, fill: 'forwards' }
    //   );
    // }

    if (i === imageOrder) {
      image[i].animate(
        {
          transform: `translate(0%, 0%)`,
        },
        { duration: 1500, fill: 'forwards' }
      );
    }

    // image[i].animate(
    //   {
    //     transform: `translate(${
    //       i * (100 + 10) - (image.length - 1) * ((-nextPercentage / 100) * 110)
    //     }%, 0%)`,
    //     objectPosition: `${100 + nextPercentage}% center`,
    //   },
    //   { duration: 1200, fill: 'forwards' }
    // );

    // Set the selected state to true
    isImageSelected = true;
  });
}

function deselectImage() {
  // Remove the "selected" and "others" classes from all image
  for (let i = 0; i < image.length; i++) {
    console.log(i * (100 + 10) - (track.dataset.imageOrder + 1) * (100 + 10));
    image[i].classList.remove('selected');
    image[i].classList.remove('others');

    if (i !== imageOrder) {
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
        { duration: 1200, fill: 'forwards' }
      );
    }
  }

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
          i * (100 + 10) - (image.length - 1) * ((-nextPercentage / 100) * 110)
        }%, 0%)`,
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: 'forwards' }
    );
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
          i * (100 + 10) - (image.length - 1) * ((-nextPercentage / 100) * 110)
        }%, 0%)`,
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: 'forwards' }
    );
  }
}

// Event Listeners
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

window.addEventListener('wheel', function (e) {
  if (isImageSelected) {
    deselectImage();
  } else {
    scrollImage(e);
  }
});
