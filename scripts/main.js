jQuery(document).ready(($) => {
  // cursor
  let mainCircle = document.createElement("div");
  mainCircle.classList.add("circle-main");
  document.body.appendChild(mainCircle);

  let secondCircle = document.createElement("div");
  secondCircle.classList.add("second-circle");
  document.body.appendChild(secondCircle);

  window.addEventListener("mousemove", function (e) {
    let x = e.pageX;
    let y = e.pageY;

    secondCircle.style.transform = `translate(${x}px, ${y}px)`;
    mainCircle.style.transform = `translate(${x}px, ${y}px)`;

    let hoverables = document.querySelectorAll(".hoverable");

    Array.from(hoverables).forEach((hoverEl) => {
      hoverEl.addEventListener("mouseover", (e) => {
        mainCircle.classList.add("circle-hide");
        secondCircle.classList.add("circle-scale");
      });
    });

    Array.from(hoverables).forEach((hoverEl) => {
      hoverEl.addEventListener("mouseout", (e) => {
        mainCircle.classList.remove("circle-hide");
        secondCircle.classList.remove("circle-scale");
      });
    });
  });

  // the big scrolling text
  jQuery(document).on("scroll", function () {
    jQuery(".off-screen-txt").css(
      "left",
      Math.max(0 - 0.03 * window.scrollY) + "vw"
    );
  });

  // you can add a class with the translate values THEN update to rotation

  $(window).scroll(function () {
    var theta = ($(window).scrollTop() / 20) * 3;
    $("#spin").css({
      transform: "rotate(" + theta + "deg)",
    });
  });

  // content fadeInUp effect
  // Function which adds the 'animated' class to any '.animatable' in view
  var doAnimations = function () {
    // Calc current offset and get all animatables
    var offset = $(window).scrollTop() + $(window).height(),
      $animatables = $(".animatable");

    // Unbind scroll handler if we have no animatables
    if ($animatables.length == 0) {
      $(window).off("scroll", doAnimations);
    }

    // Check all animatables and animate them if necessary
    $animatables.each(function (i) {
      var $animatable = $(this);
      if ($animatable.offset().top + $animatable.height() - 10 < offset) {
        $animatable.removeClass("animatable").addClass("animated");
      }
    });
  };

  // Hook doAnimations on scroll, and trigger a scroll
  $(window).on("scroll", doAnimations);
  $(window).trigger("scroll");
});
