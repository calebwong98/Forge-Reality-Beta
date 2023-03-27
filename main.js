const track = document.getElementById('image-track');
const image = track.children;
let isImageSelected = false;

// Select & Unselect Image
for (let i = 0; i < image.length; i++) {
  image[i].addEventListener('click', function (event) {
    // Use event.target to get the clicked image element
    const selectedImage = event.target;
    const imageOrder = Array.prototype.indexOf.call(image, selectedImage);

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

    // Set the selected state to true
    isImageSelected = true;

    track.animate(
      {
        transform: `translate(0%, 0%)`,
      },
      { duration: 500, fill: 'forwards' }
    );
  });
}

function deselectImage() {
  // Remove the "selected" and "others" classes from all image
  for (let i = 0; i < track.children.length; i++) {
    track.children[i].classList.remove('selected');
    track.children[i].classList.remove('others');
  }

  track.animate(
    {
      transform: `translate(${track.dataset.percentage}%, 0%)`,
    },
    { duration: 1200, fill: 'forwards' }
  );

  isImageSelected = false;
}

// Mouse Wheel Scroll
function scrollImage(e) {
  const wheelDelta = e.deltaY,
    maxDelta = window.innerWidth;

  const percentage = (wheelDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -50);

  track.dataset.percentage = nextPercentage;

  track.dataset.prevPercentage = track.dataset.percentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, 0%)`,
    },
    { duration: 1200, fill: 'forwards' }
  );

  for (const image of track.getElementsByClassName('image')) {
    image.animate(
      {
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
    maxDelta = window.innerWidth;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -50);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, 0%)`,
    },
    { duration: 1200, fill: 'forwards' }
  );

  for (const image of track.getElementsByClassName('image')) {
    image.animate(
      {
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
