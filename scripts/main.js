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

    // selecting all links
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
    jQuery(".lft-scrl").css("left", Math.max(0 - 0.03 * window.scrollY) + "vw");
    jQuery(".right-scrl").css(
      "right",
      Math.max(0 - 0.9 * (window.scrollY / 30)) + "vw"
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

  // scrollMagic cards
  $(function () {
    // wait for document ready
    // init
    var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: "onLeave",
        duration: "200%", // this works just fine with duration 0 as well
        // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
        // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
      },
    });

    // get all slides
    var slides = document.querySelectorAll("section.panel");

    // create scene for every slide
    for (var i = 0; i < slides.length; i++) {
      new ScrollMagic.Scene({
        triggerElement: slides[i],
      })
        .setPin(slides[i], { pushFollowers: false })
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    }
  });
  	$(window)
      .scroll(function () {
        // selectors
        var $window = $(window),
          $body = $("body"),
          $section = $("section");

        // Change 33% earlier than scroll position so colour is there when you arrive.
        var scroll = $window.scrollTop() + $window.height() / 3;
        $section.each(function () {
          var $this = $(this);

          // if position is within range of this panel.
          // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
          // Remember we set the scroll to 33% earlier in scroll var.
          if (
            $this.position().top <= scroll &&
            $this.position().top + $this.height() > scroll
          ) {
            // Remove all classes on body with color-
            $body.removeClass(function (index, css) {
              return (css.match(/(^|\s)color-\S+/g) || []).join(" ");
            });

            // Add class of currently active div
            $body.addClass("color-" + $(this).data("color"));
          }
        });
      })

});
