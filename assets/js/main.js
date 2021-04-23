/**
* Template Name: BizLand - v3.1.0
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Owl initializer
   */

   const productList = [
       {
            brand: "John Deere",
            power: 20,
            model: "NWJD20"
        },
        {
            brand: "Baudouin",
            power: 20,
            model: "MNWB20"
        },
        {
            brand: "Grupel-Grupel",
            power: 20,
            model: "NWGRGG20"
        },
        {
            brand: "John Deere",
            power: 25,
            model: "NWJD25"
        },
        {
            brand: "Grupel-Grupel",
            power: 28,
            model: "NWGRGG28"
        },
        {
            brand: "John Deere",
            power: 30,
            model: "NWJD30"
        },
        {
            brand: "Baudouin",
            power: 30,
            model: "NWB030"
        },
        {
            brand: "Grupel-Grupel",
            power: 31,
            model: "NWGRGG30"
        },
        {
            brand: "Grupel-Grupel",
            power: 37,
            model: "NWGRGG30"
        },
        {
            brand: "Baudouin",
            power: 40,
            model: "NWB040"
        },
        {
            brand: "John Deere",
            power: 40,
            model: "NWJD40"
        },
        {
            brand: "Baudouin",
            power: 50,
            model: "NWB050"
        },
        {
            brand: "John Deere",
            power: 60,
            model: "NWJD60"
        },
        {
            brand: "Baudouin",
            power: 60,
            model: "NWB060"
        },
        {
            brand: "Grupel-Grupel",
            power: 63,
            model: "NWGRBD60"
        },
        {
            brand: "John Deere",
            power: 80,
            model: "NWJD80"
        },
        {
            brand: "John Deere",
            power: 80,
            model: "NWJD80"
        },
        {
            brand: "Baudouin",
            power: 80,
            model: "NWB080"
        },
        {
            brand: "Grupel-Grupel",
            power: 100,
            model: "NWGRBD100"
        },
        {
            brand: "John Deere",
            power: 100,
            model: "NWJD100"
        },
        {
            brand: "Baudouin",
            power: 100,
            model: "NWB100"
        },
        {
            brand: "John Deere",
            power: 125,
            model: "NWJD125"
        },
        {
            brand: "Baudouin",
            power: 135,
            model: "NWB135"
        },
        {
            brand: "John Deere",
            power: 150,
            model: "NWJD150"
        },
        {
            brand: "Grupel-Grupel",
            power: 150,
            model: "NWGRBD100"
        },
        {
            brand: "Baudouin",
            power: 150,
            model: "NWB150"
        },
        {
            brand: "John Deere",
            power: 200,
            model: "NWJD200M"
        },
        {
            brand: "Grupel-Grupel",
            power: 200,
            model: "NWGRBD100"
        },
        {
            brand: "Baudouin",
            power: 200,
            model: "NWB200"
        },
        {
            brand: "Baudouin",
            power: 250,
            model: "NWB250"
        },
        {
            brand: "John Deere",
            power: 250,
            model: "NWJD250"
        },
        {
            brand: "Volvo",
            power: 250,
            model: "NWV250"
        },
        {
            brand: "Baudouin",
            power: 300,
            model: "NWB300"
        },
        {
            brand: "John Deere",
            power: 300,
            model: "NWJD300"
        },
        {
            brand: "Volvo",
            power: 300,
            model: "NWV300"
        },
        {
            brand: "Baudouin",
            power: 350,
            model: "NWB350"
        },
        {
            brand: "John Deere",
            power: 350,
            model: "NWJD350"
        },
        {
            brand: "Volvo",
            power: 350,
            model: "NWV350"
        },
        {
            brand: "Baudouin",
            power: 400,
            model: "MWB400"
        },
        {
            brand: "John Deere",
            power: 400,
            model: "NWJD400"
        },
        {
            brand: "Volvo",
            power: 400,
            model: "NWV400"
        },
        {
            brand: "Baudouin",
            power: 450,
            model: "NWB450"
        },
        {
            brand: "John Deere",
            power: 450,
            model: "NWJD450"
        },
        {
            brand: "Volvo",
            power: 450,
            model: "NWV450"
        },
        {
            brand: "Baudouin",
            power: 500,
            model: "NWB500"
        },
        {
            brand: "Volvo",
            power: 500,
            model: "NWV500"
        },
        {
            brand: "Baudouin",
            power: 600,
            model: "NWB600"
        },
        {
            brand: "Volvo",
            power: 593,
            model: "NWV600"
        },
        {
            brand: "Volvo",
            power: 650,
            model: "NWV630"
        },
        {
            brand: "Baudouin",
            power: 650,
            model: "NWB650"
        },
        {
            brand: "Baudouin",
            power: 750,
            model: "NWB750"
        },
        {
            brand: "Baudouin",
            power: 800,
            model: "NWB800"
        },
        {
            brand: "Mitsubishi",
            power: 800,
            model: "NWMT800"
        },
        {
            brand: "Baudouin",
            power: 900,
            model: "NWB900"
        },
        {
            brand: "Baudouin",
            power: 1000,
            model: "NWB1000"
        },
        {
            brand: "Mitsubishi",
            power: 1000,
            model: "NWMT1000"
        },
        {
            brand: "Baudouin",
            power: 1250,
            model: "NWB1250"
        },
        {
            brand: "Mitsubishi",
            power: 1250,
            model: "NWMT1250"
        },
        {
            brand: "Baudouin",
            power: 1500,
            model: "NWB1500"
        },
        {
            brand: "Mitsubishi",
            power: 1500,
            model: "NWMT1500"
        },
        {
            brand: "Mitsubishi",
            power: 1700,
            model: "NWMT1700"
        },
        {
            brand: "Baudouin",
            power: 1750,
            model: "NWB1750"
        },
        {
            brand: "Mitsubishi",
            power: 2000,
            model: "NWMT2000"
        },
        {
            brand: "Baudouin",
            power: 2000,
            model: "NWB2000"
        },
        {
            brand: "Mitsubishi",
            power: 2200,
            model: "NWMT2200"
        },
        {
            brand: "Baudouin",
            power: 2200,
            model: "NWB2200"
        },
        {
            brand: "Baudouin",
            power: 2500,
            model: "NWB2500"
        }
   ];

   const owlCarouselNodes = [
     document.querySelector("#owl-carousel-1"),
     document.querySelector("#owl-carousel-2"),
     document.querySelector("#owl-carousel-3"),
     document.querySelector("#owl-carousel-4"),
     document.querySelector("#owl-carousel-5")
   ];

   // product card elements
   function createCard () {
     // create card elements
     const card = document.createElement("div");
     card.classList.add("card", "shadow");

     const cardImg = document.createElement("img");
     cardImg.classList.add("card-img-top");

     const cardBody = document.createElement("div");
     cardBody.classList.add("card-body");

     const cardTitle = document.createElement("h5");
     cardTitle.classList.add("card-title");

     const cardProdNo = document.createElement("span");
     cardProdNo.classList.add("prod-no");

     const listGroup = document.createElement("div");
     listGroup.classList.add("list-group");

     const listItem = document.createElement("p");
     listItem.classList.add("list-item");

     // append elements to card
     cardBody.append(cardTitle);
     cardTitle.append(document.createElement("br"), cardProdNo);
     listGroup.append(listItem);
     card.append(cardImg, cardBody, listGroup);

     return card;
   }

   for(var i = 0; i < productList.length; i++){
     var productCard = createCard();
     var productListSize = Object.keys(productList[i]).length;

     // select card elements
     var cardTitle = productCard.querySelector(".card-title");
     var cardProdNo = productCard.querySelector(".prod-no");
     var listItem = productCard.querySelector(".list-item");
     var img = productCard.querySelector(".card-img-top");

     // product properties
     var brand = productList[i].brand;
     var model = productList[i].model;
     var power = productList[i].power;

     // assign img src
     if(brand == "Baudouin") img.src = "assets/img/products/baudouin.jpg";
     if(brand == "John Deere") img.src = "assets/img/products/john-deer.jpg";
     if(brand == "Mitsubishi") img.src = "assets/img/products/mitsubishi.png";
     if(brand == "Volvo") img.src = "assets/img/products/volvo.png";
     if(brand == "Grupel-Grupel") img.src = "assets/img/products/grupel.jpg";


     // append card elements as children in the ".card" element
     cardTitle.insertAdjacentText("afterbegin", brand);
     cardProdNo.append(model);
     listItem.append(power + " kVA");

     // insert cards into rows relevant to the product power property
     var power = productList[i].power;

     switch (true) {
         case power <= 75:
         owlCarouselNodes[0].append(productCard);
         break;

         case power > 75 && power <= 375:
         owlCarouselNodes[1].append(productCard);
         break;

         case power > 375 && power <= 1000:
         owlCarouselNodes[2].append(productCard);
         break;

         case power > 1000:
         owlCarouselNodes[3].append(productCard);
         break;

       default:
       console.log("done")
     }

   }

   $(".owl-carousel").owlCarousel({
     loop: true,
     items: 4,
     nav: true,
     dots: true,
     responsiveClass: true,
     responsive:{
       0:{
           items:2,
           nav:false,
           loop:true,
           margin: 10
       },
       600:{
           items:3,
           nav:false,
           loop:false,
           margin: 10
       },
       1000:{
           items:4,
           nav:true,
           loop:false,
           dots: true,
       }
   }
   });

   /**
    * Create categories
    */

   const owlNavNodes = [
     document.querySelector("#owl-carousel-1 .owl-nav"),
     document.querySelector("#owl-carousel-2 .owl-nav"),
     document.querySelector("#owl-carousel-3 .owl-nav"),
     document.querySelector("#owl-carousel-4 .owl-nav"),
     document.querySelector("#owl-carousel-5 .owl-nav")
   ];
   const categories = ["20 - 75", "75.1 - 375", "375.1 - 1000", "Above 1000.1"]

   for (var i = 0; i < owlNavNodes.length; i++) {
     const header = document.createElement("h3");
     header.append(categories[i] + " kVA");

     owlNavNodes[i].prepend(header);


     if(i == 3) break;
   }

})()
