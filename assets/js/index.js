var innerDocWidth = window.innerWidth;
var innerDocHeight = window.innerHeight;

// loader
// $(window).load(function() {
//     setTimeout(function () {
//         $("#loader").fadeOut("fast");
//     }, 2000);
// });

// Menu
setTimeout(function () {

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

window.classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// })( window );


    // burger animation
    var $hamburger = $(".hamburger");
    $hamburger.on("click", function(e) {
        $hamburger.toggleClass("is-active");

        var eventClass = e.currentTarget.className;

        if (eventClass.indexOf('is-active') > -1) {
            setTimeout(function () {
                $('.block_a').css('display', 'block');
            }, 1800);
        } else {
            $('.block_a').css('display', 'none');
        }

    });
}, 500);



var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
var scrollY = window.pageYOffset || document.documentElement.scrollTop;

function myScript(){
    var scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
}

window.addEventListener("scroll", myScript);

function getPathObject(selector, callback) {
    var selected = document.querySelector(selector);

    if (selected) {
        return callback(null, selected);
    } else {
        return callback(true);
    }
}

$(window).scroll(function () {
    var sc = $(window).scrollTop()
    if (sc > 150) {
        $("#main-navbar").addClass("navbar-scroll")
    }
    else {
        $("#main-navbar").removeClass("navbar-scroll")
    }
});


// if (innerDocWidth >= 1801) {
//
// }
// if (innerDocWidth < 1800 && innerDocWidth >= 1550) {
//
// }
