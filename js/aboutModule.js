// var aboutModule = (function () {
//   var scroll = -95;
//   // Private function to operate biography
//   // MOUSEWHEEL SCROLL
//   function scrollBio(e, about, biography) {
//     // Calculate percentage of wheel scrolled
//     const wheelDelta = e.deltaY / 5,
//       maxDelta = window.innerHeight;

//     const percentage = (wheelDelta / maxDelta) * -100,
//       nextPercentageUnconstrained =
//         parseFloat(about.dataset.prevPercentage) + percentage,
//       nextPercentage = Math.max(
//         Math.min(nextPercentageUnconstrained, 0),
//         scroll
//       );

//     about.dataset.percentage = nextPercentage;

//     about.dataset.prevPercentage = about.dataset.percentage;

//     // TranslateY biography position
//     biography.animate(
//       {
//         transform: `translate( 0%, ${nextPercentage}%)`,
//       },
//       { duration: 1200, fill: 'both' }
//     );
//   }

//   // TOUCHDRAG SCROLL
//   function touchStart(about, e) {
//     about.dataset.mouseDownAt = e.touches[0].clientY;
//   }
//   function touchEnd(about) {
//     about.dataset.mouseDownAt = '0';
//     about.dataset.prevPercentage = about.dataset.percentage;
//   }
//   function touchMove(about, e) {
//     if (about.dataset.mouseDownAt === '0') return;

//     const mouseDelta =
//         (parseFloat(about.dataset.mouseDownAt) - e.touches[0].clientY) / 5,
//       maxDelta = window.innerHeight;

//     const percentage = (mouseDelta / maxDelta) * -100,
//       nextPercentageUnconstrained =
//         parseFloat(about.dataset.prevPercentage) + percentage,
//       nextPercentage = Math.max(
//         Math.min(nextPercentageUnconstrained, 0),
//         scroll
//       );

//     about.dataset.percentage = nextPercentage;

//     about.dataset.prevPercentage = about.dataset.percentage;

//     // TranslateY biography position
//     biography.animate(
//       {
//         transform: `translate( 0%, ${nextPercentage}%)`,
//       },
//       { duration: 1200, fill: 'both' }
//     );
//   }

//   // Public function to initialize the module
//   function init() {
//     const about = document.getElementById('about');
//     const biography = document.getElementById('biography');

//     about.addEventListener('wheel', function (e) {
//       scrollBio(e, about, biography);
//     });

//     // Mobile
//     about.addEventListener('touchstart', function (e) {
//       touchStart(about, e);
//     });
//     about.addEventListener('touchend', function () {
//       touchEnd(about);
//     });
//     window.addEventListener('touchmove', function (e) {
//       touchMove(about, e);
//     });
//   }

//   return {
//     init: init,
//   };
// })();

// // Export the module
// export { aboutModule };
