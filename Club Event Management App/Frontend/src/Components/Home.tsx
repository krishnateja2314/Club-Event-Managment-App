import React, { Children, useEffect, useState } from "react";
import "./assets/css/Home.css";
import GLightbox from "glightbox";
import Swiper from "swiper";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/swiper-bundle.css";

interface props {
  children: string;
}

const Home = ({ children }: props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleScroll);
    };
  }, []);

  useEffect(() => {
    const preloader = document.querySelector("#preloader");
    if (preloader) {
      window.addEventListener("load", () => {
        preloader.remove();
      });
    }
  }, []);

  useEffect(() => {
    const glightbox = GLightbox({ selector: ".glightbox" });

    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    const initSwiper = () => {
      document.querySelectorAll(".swiper").forEach((swiper) => {
        const config = JSON.parse(
          swiper.querySelector(".swiper-config")?.innerHTML.trim() || "{}"
        );
        new Swiper(swiper, config);
      });
    };

    window.addEventListener("load", initSwiper);

    return () => {
      glightbox.destroy();
      window.removeEventListener("load", initSwiper);
    };
  }, []);

  useEffect(() => {
    const handleHashLink = () => {
      if (window.location.hash) {
        const section = document.querySelector(window.location.hash);
        if (section) {
          setTimeout(() => {
            const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
            window.scrollTo({
              top: section.offsetTop - parseInt(scrollMarginTop, 10),
              behavior: "smooth",
            });
          }, 100);
        }
      }
    };

    window.addEventListener("load", handleHashLink);

    return () => {
      window.removeEventListener("load", handleHashLink);
    };
  }, []);

  useEffect(() => {
    const handleNavMenuScrollspy = () => {
      const navmenulinks = document.querySelectorAll(".navmenu a");
      navmenulinks.forEach((navmenulink) => {
        if (!navmenulink.hash) return;
        const section = document.querySelector(navmenulink.hash);
        if (!section) return;
        const position = window.scrollY + 200;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          document
            .querySelectorAll(".navmenu a.active")
            .forEach((link) => link.classList.remove("active"));
          navmenulink.classList.add("active");
        } else {
          navmenulink.classList.remove("active");
        }
      });
    };

    window.addEventListener("load", handleNavMenuScrollspy);
    document.addEventListener("scroll", handleNavMenuScrollspy);

    return () => {
      window.removeEventListener("load", handleNavMenuScrollspy);
      document.removeEventListener("scroll", handleNavMenuScrollspy);
    };
  }, []);

  const toggleMobileNav = () => {
    setIsMobileNavActive(!isMobileNavActive);
  };

  const toggleFaqItem = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    target?.classList.toggle("faq-active");
  };

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a
            href="index.html"
            className="logo d-flex align-items-center me-auto"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCWrcJ9Jmdt7XQBzbNVlnpaRc1XzbwxQP7Lw&s"
              alt=""
            />
            <h1 className="sitename">Event Name</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="index.html#hero" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="index.html#about">About</a>
              </li>
              <li>
                <a href="index.html#features">Featured Event</a>
              </li>
              <li>
                <a href="index.html#services">Events</a>
              </li>
              <li>
                <a href="index.html#contact">Contact</a>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <a className="btn-getstarted" href="index.html#about">
            {children}
          </a>
        </div>
      </header>

      <main className="main">
        <section id="hero" className="hero section">
          <div className="hero-bg">
            <img src="img/hero-bg-light.webp" alt="" />
          </div>
          <div className="container text-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h1 data-aos="fade-up">
                Welcome to <span>Event Name</span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="100">
                Book your ticket to IIT Hyderabad.
                <br />
              </p>
              <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                <a href="#about" className="btn-get-started">
                  Get Started
                </a>
                <a
                  href="https://www.youtube.com/watch?v=ttbe0l-dyF0"
                  className="glightbox btn-watch-video d-flex align-items-center"
                >
                  <i className="bi bi-play-circle"></i>
                  <span>Watch Video</span>
                </a>
              </div>
              <img
                src="img/hero-services-img.webp"
                className="img-fluid hero-img"
                alt=""
                data-aos="zoom-out"
                data-aos-delay="300"
              />
            </div>
          </div>
        </section>

        <section id="featured-services" className="featured-services section">
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-xl-4 col-lg-6"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0">
                    <i className="bi bi-briefcase"></i>
                  </div>
                  <div>
                    <h4 className="title">
                      <a href="#" className="stretched-link">
                        Lorem Ipsum
                      </a>
                    </h4>
                    <p className="description">
                      Voluptatum deleniti atque corrupti quos dolores et quas
                      molestias excepturi
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-4 col-lg-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0">
                    <i className="bi bi-card-checklist"></i>
                  </div>
                  <div>
                    <h4 className="title">
                      <a href="#" className="stretched-link">
                        Dolor Sitema
                      </a>
                    </h4>
                    <p className="description">
                      Minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip exa
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="col-xl-4 col-lg-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="service-item d-flex">
                  <div className="icon flex-shrink-0">
                    <i className="bi bi-bar-chart"></i>
                  </div>
                  <div>
                    <h4 className="title">
                      <a href="#" className="stretched-link">
                        Sed ut perspiciatis
                      </a>
                    </h4>
                    <p className="description">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about section">
          <div className="container">
            <div className="row gy-4">
              <div
                className="col-lg-6 content"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <p className="who-we-are">Who We Are</p>
                <h3>
                  We are the team of Event name here to unleash a creative fest
                </h3>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <ul>
                  <li>
                    <i className="bi bi-check-circle"></i>{" "}
                    <span>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>{" "}
                    <span>
                      Duis aute irure dolor in reprehenderit in voluptate velit.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle"></i>{" "}
                    <span>
                      Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate
                      trideta storacalaperda mastiro dolore eu fugiat nulla
                      pariatur.
                    </span>
                  </li>
                </ul>
                <a href="#" className="read-more">
                  <span>Read More</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>

              <div
                className="col-lg-6 about-images"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="row gy-4">
                  <div className="col-lg-6">
                    <img
                      src="img/about-company-1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="row gy-4">
                      <div className="col-lg-12">
                        <img
                          src="img/about-company-2.jpg"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                      <div className="col-lg-12">
                        <img
                          src="img/about-company-3.jpg"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="clients" className="clients section">
          <div className="container" data-aos="fade-up">
            <div className="row gy-4">
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img
                  src="img/clients/client-1.png"
                  className="img-fluid"
                  alt=""
                />
              </div>

              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img
                  src="img/clients/client-2.png"
                  className="img-fluid"
                  alt=""
                />
              </div>

              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img
                  src="img/clients/client-3.png"
                  className="img-fluid"
                  alt=""
                />
              </div>

              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img
                  src="img/clients/client-4.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img
                  src="img/clients/client-5.png"
                  className="img-fluid"
                  alt=""
                />
              </div>

              <div className="col-xl-2 col-md-3 col-6 client-logo">
                <img
                  src="img/clients/client-6.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Featured Event</h2>
            <p>
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </p>
          </div>

          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5 d-flex align-items-center">
                <ul
                  className="nav nav-tabs"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active show"
                      data-bs-toggle="tab"
                      data-bs-target="#features-tab-1"
                    >
                      <i className="bi bi-binoculars"></i>
                      <div>
                        <h4 className="d-none d-lg-block">
                          Modi sit est dela pireda nest
                        </h4>
                        <p>
                          Ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#features-tab-2"
                    >
                      <i className="bi bi-box-seam"></i>
                      <div>
                        <h4 className="d-none d-lg-block">
                          Unde praesenti mara setra le
                        </h4>
                        <p>
                          Recusandae atque nihil. Delectus vitae non similique
                          magnam molestiae sapiente similique tenetur aut
                          voluptates sed voluptas ipsum voluptas
                        </p>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#features-tab-3"
                    >
                      <i className="bi bi-brightness-high"></i>
                      <div>
                        <h4 className="d-none d-lg-block">
                          Pariatur explica nitro dela
                        </h4>
                        <p>
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum Debitis nulla est maxime voluptas dolor aut
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-lg-6">
                <div
                  className="tab-content"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div
                    className="tab-pane fade active show"
                    id="features-tab-1"
                  >
                    <img src="img/tabs-1.jpg" alt="" className="img-fluid" />
                  </div>
                  <div className="tab-pane fade" id="features-tab-2">
                    <img src="img/tabs-2.jpg" alt="" className="img-fluid" />
                  </div>

                  <div className="tab-pane fade" id="features-tab-3">
                    <img src="img/tabs-3.jpg" alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features-details" className="features-details section">
          <div className="container">
            <div className="row gy-4 justify-content-between features-item">
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                <img src="img/features-1.jpg" className="img-fluid" alt="" />
              </div>

              <div
                className="col-lg-5 d-flex align-items-center"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="content">
                  <h3>Corporis temporibus maiores provident</h3>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident.
                  </p>
                  <a href="#" className="btn more-btn">
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            <div className="row gy-4 justify-content-between features-item">
              <div
                className="col-lg-5 d-flex align-items-center order-2 order-lg-1"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="content">
                  <h3>Neque ipsum omnis sapiente quod quia dicta</h3>
                  <p>
                    Quidem qui dolore incidunt aut. In assumenda harum id iusto
                    lorena plasico mares
                  </p>
                  <ul>
                    <li>
                      <i className="bi bi-easel flex-shrink-0"></i> Et corporis
                      ea eveniet ducimus.
                    </li>
                    <li>
                      <i className="bi bi-patch-check flex-shrink-0"></i>{" "}
                      Exercitationem dolorem sapiente.
                    </li>
                    <li>
                      <i className="bi bi-brightness-high flex-shrink-0"></i>{" "}
                      Veniam quia modi magnam.
                    </li>
                  </ul>
                  <p></p>
                  <a href="#" className="btn more-btn">
                    Learn More
                  </a>
                </div>
              </div>

              <div
                className="col-lg-6 order-1 order-lg-2"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <img src="img/features-2.jpg" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Events</h2>
            <p>
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </p>
          </div>

          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                <div className="service-item item-cyan position-relative">
                  <i className="bi bi-activity icon"></i>
                  <div>
                    <h3>Nesciunt Mete</h3>
                    <p>
                      Provident nihil minus qui consequatur non omnis maiores.
                      Eos accusantium minus dolores iure perferendis tempore et
                      consequatur.
                    </p>
                    <a
                      href="service-details.html"
                      className="read-more stretched-link"
                    >
                      Learn More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                <div className="service-item item-orange position-relative">
                  <i className="bi bi-broadcast icon"></i>
                  <div>
                    <h3>Eosle Commodi</h3>
                    <p>
                      Ut autem aut autem non a. Sint sint sit facilis nam iusto
                      sint. Libero corrupti neque eum hic non ut nesciunt
                      dolorem.
                    </p>
                    <a
                      href="service-details.html"
                      className="read-more stretched-link"
                    >
                      Learn More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                <div className="service-item item-teal position-relative">
                  <i className="bi bi-easel icon"></i>
                  <div>
                    <h3>Ledo Markt</h3>
                    <p>
                      Ut excepturi voluptatem nisi sed. Quidem fuga consequatur.
                      Minus ea aut. Vel qui id voluptas adipisci eos earum
                      corrupti.
                    </p>
                    <a
                      href="service-details.html"
                      className="read-more stretched-link"
                    >
                      Learn More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="400">
                <div className="service-item item-red position-relative">
                  <i className="bi bi-bounding-box-circles icon"></i>
                  <div>
                    <h3>Asperiores Commodi</h3>
                    <p>
                      Non et temporibus minus omnis sed dolor esse consequatur.
                      Cupiditate sed error ea fuga sit provident adipisci neque.
                    </p>
                    <a
                      href="service-details.html"
                      className="read-more stretched-link"
                    >
                      Learn More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
                <div className="service-item item-indigo position-relative">
                  <i className="bi bi-calendar4-week icon"></i>
                  <div>
                    <h3>Velit Doloremque.</h3>
                    <p>
                      Cumque et suscipit saepe. Est maiores autem enim facilis
                      ut aut ipsam corporis aut. Sed animi at autem alias eius
                      labore.
                    </p>
                    <a
                      href="service-details.html"
                      className="read-more stretched-link"
                    >
                      Learn More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="600">
                <div className="service-item item-pink position-relative">
                  <i className="bi bi-chat-square-text icon"></i>
                  <div>
                    <h3>Dolori Architecto</h3>
                    <p>
                      Hic molestias ea quibusdam eos. Fugiat enim doloremque aut
                      neque non et debitis iure. Corrupti recusandae ducimus
                      enim.
                    </p>
                    <a
                      href="service-details.html"
                      className="read-more stretched-link"
                    >
                      Learn More <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="more-features" className="more-features section">
          <div className="container">
            <div className="row justify-content-around gy-4">
              <div
                className="col-lg-6 d-flex flex-column justify-content-center order-2 order-lg-1"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h3>Enim quis est voluptatibus aliquid consequatur</h3>
                <p>
                  Esse voluptas cumque vel exercitationem. Reiciendis est hic
                  accusamus. Non ipsam et sed minima temporibus laudantium.
                  Soluta voluptate sed facere corporis dolores excepturi
                </p>

                <div className="row">
                  <div className="col-lg-6 icon-box d-flex">
                    <i className="bi bi-easel flex-shrink-0"></i>
                    <div>
                      <h4>Lorem Ipsum</h4>
                      <p>
                        Voluptatum deleniti atque corrupti quos dolores et quas
                        molestias{" "}
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6 icon-box d-flex">
                    <i className="bi bi-patch-check flex-shrink-0"></i>
                    <div>
                      <h4>Nemo Enim</h4>
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiise
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6 icon-box d-flex">
                    <i className="bi bi-brightness-high flex-shrink-0"></i>
                    <div>
                      <h4>Dine Pad</h4>
                      <p>
                        Explicabo est voluptatum asperiores consequatur magnam.
                        Et veritatis odit
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-6 icon-box d-flex">
                    <i className="bi bi-brightness-high flex-shrink-0"></i>
                    <div>
                      <h4>Tride clov</h4>
                      <p>
                        Est voluptatem labore deleniti quis a delectus et. Saepe
                        dolorem libero sit
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="features-image col-lg-5 order-1 order-lg-2"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <img src="img/features-3.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="faq section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="container">
            <div className="row justify-content-center">
              <div
                className="col-lg-10"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="faq-container">
                  <div className="faq-item faq-active">
                    <h3>Non consectetur a erat nam at lectus urna duis?</h3>
                    <div className="faq-content">
                      <p>
                        Feugiat pretium nibh ipsum consequat. Tempus iaculis
                        urna id volutpat lacus laoreet non curabitur gravida.
                        Venenatis lectus magna fringilla urna porttitor rhoncus
                        dolor purus non.
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>

                  <div className="faq-item">
                    <h3>
                      Feugiat scelerisque varius morbi enim nunc faucibus?
                    </h3>
                    <div className="faq-content">
                      <p>
                        Dolor sit amet consectetur adipiscing elit pellentesque
                        habitant morbi. Id interdum velit laoreet id donec
                        ultrices. Fringilla phasellus faucibus scelerisque
                        eleifend donec pretium. Est pellentesque elit
                        ullamcorper dignissim. Mauris ultrices eros in cursus
                        turpis massa tincidunt dui.
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>

                  <div className="faq-item">
                    <h3>
                      Dolor sit amet consectetur adipiscing elit pellentesque?
                    </h3>
                    <div className="faq-content">
                      <p>
                        Eleifend mi in nulla posuere sollicitudin aliquam
                        ultrices sagittis orci. Faucibus pulvinar elementum
                        integer enim. Sem nulla pharetra diam sit amet nisl
                        suscipit. Rutrum tellus pellentesque eu tincidunt.
                        Lectus urna duis convallis convallis tellus. Urna
                        molestie at elementum eu facilisis sed odio morbi quis
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>

                  <div className="faq-item">
                    <h3>
                      Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?
                    </h3>
                    <div className="faq-content">
                      <p>
                        Dolor sit amet consectetur adipiscing elit pellentesque
                        habitant morbi. Id interdum velit laoreet id donec
                        ultrices. Fringilla phasellus faucibus scelerisque
                        eleifend donec pretium. Est pellentesque elit
                        ullamcorper dignissim. Mauris ultrices eros in cursus
                        turpis massa tincidunt dui.
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>

                  <div className="faq-item">
                    <h3>
                      Tempus quam pellentesque nec nam aliquam sem et tortor?
                    </h3>
                    <div className="faq-content">
                      <p>
                        Molestie a iaculis at erat pellentesque adipiscing
                        commodo. Dignissim suspendisse in est ante in. Nunc vel
                        risus commodo viverra maecenas accumsan. Sit amet nisl
                        suscipit adipiscing bibendum est. Purus gravida quis
                        blandit turpis cursus in
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>

                  <div className="faq-item">
                    <h3>Perspiciatis quod quo quos nulla quo illum ullam?</h3>
                    <div className="faq-content">
                      <p>
                        Enim ea facilis quaerat voluptas quidem et dolorem. Quis
                        et consequatur non sed in suscipit sequi. Distinctio
                        ipsam dolore et.
                      </p>
                    </div>
                    <i className="faq-toggle bi bi-chevron-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="testimonials section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Testimonials</h2>
            <p>
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <p>
                      Proin iaculis purus consequat sem cure digni ssim donec
                      porttitora entum suscipit rhoncus. Accusantium quam,
                      ultricies eget id, aliquam eget nibh et. Maecen aliquam,
                      risus at semper.
                    </p>
                    <div className="profile mt-auto">
                      <img
                        src="img/testimonials/testimonials-1.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Saul Goodman</h3>
                      <h4>Ceo &amp; Founder</h4>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <p>
                      Export tempor illum tamen malis malis eram quae irure esse
                      labore quem cillum quid cillum eram malis quorum velit
                      fore eram velit sunt aliqua noster fugiat irure amet legam
                      anim culpa.
                    </p>
                    <div className="profile mt-auto">
                      <img
                        src="img/testimonials/testimonials-2.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Sara Wilsson</h3>
                      <h4>Designer</h4>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <p>
                      Enim nisi quem export duis labore cillum quae magna enim
                      sint quorum nulla quem veniam duis minim tempor labore
                      quem eram duis noster aute amet eram fore quis sint minim.
                    </p>
                    <div className="profile mt-auto">
                      <img
                        src="img/testimonials/testimonials-3.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Jena Karlis</h3>
                      <h4>Store Owner</h4>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <p>
                      Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                      multos export minim fugiat minim velit minim dolor enim
                      duis veniam ipsum anim magna sunt elit fore quem dolore
                      labore illum veniam.
                    </p>
                    <div className="profile mt-auto">
                      <img
                        src="img/testimonials/testimonials-4.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>Matt Brandon</h3>
                      <h4>Freelancer</h4>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <p>
                      Quis quorum aliqua sint quem legam fore sunt eram irure
                      aliqua veniam tempor noster veniam enim culpa labore duis
                      sunt culpa nulla illum cillum fugiat legam esse veniam
                      culpa fore nisi cillum quid.
                    </p>
                    <div className="profile mt-auto">
                      <img
                        src="img/testimonials/testimonials-5.jpg"
                        className="testimonial-img"
                        alt=""
                      />
                      <h3>John Larson</h3>
                      <h4>Entrepreneur</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Contact</h2>
            <p>
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-6">
                <div
                  className="info-item d-flex flex-column justify-content-center align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <i className="bi bi-geo-alt"></i>
                  <h3>Address</h3>
                  <p>IIT Hyderabad,Kandhi</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div
                  className="info-item d-flex flex-column justify-content-center align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <i className="bi bi-telephone"></i>
                  <h3>Call Us</h3>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div
                  className="info-item d-flex flex-column justify-content-center align-items-center"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <i className="bi bi-envelope"></i>
                  <h3>Email Us</h3>
                  <p>info@example.com</p>
                </div>
              </div>
            </div>

            <div className="row gy-4 mt-1">
              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7606.338001708486!2d78.11718765569739!3d17.594707936390016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbefdc136bffbb%3A0x73414ff6594c9191!2sIndian%20Institute%20of%20Technology%20Hyderabad!5e0!3m2!1sen!2sin!4v1718364498251!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                ></iframe>
              </div>

              <div className="col-lg-6">
                <form
                  action="forms/contact.php"
                  method="post"
                  className="php-email-form"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="col-md-6 ">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Subject"
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        name="message"
                        rows={6}
                        placeholder="Message"
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message"></div>
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>

                      <button type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="footer position-relative">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="index.html" className="logo d-flex align-items-center">
                <span className="sitename">Event Name</span>
              </a>
              <div className="footer-contact pt-3">
                <p>A108 Adam Street</p>
                <p>New York, NY 535022</p>
                <p className="mt-3">
                  <strong>Phone:</strong> <span>+1 5589 55488 55</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>info@example.com</span>
                </p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href="">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Events</a>
                </li>
                <li>
                  <a href="#">Terms of service</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Events</h4>
              <ul>
                <li>
                  <a href="#">Event 1</a>
                </li>
                <li>
                  <a href="#">Event 2</a>
                </li>
                <li>
                  <a href="#">Event 3</a>
                </li>
                <li>
                  <a href="#">Event 4</a>
                </li>
                <li>
                  <a href="#">Event 5</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>
                Subscribe to our newsletter and receive the latest news about
                our products and services!
              </p>
              <form
                action="forms/newsletter.php"
                method="post"
                className="php-email-form"
              >
                <div className="newsletter-form">
                  <input type="email" name="email" />
                  <input type="submit" value="Subscribe" />
                </div>
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">
                  Your subscription request has been sent. Thank you!
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">Event Name</strong>
            <span>All Rights Reserved</span>
          </p>
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </footer>

      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>

      <div></div>
    </>
  );
};

export default Home;
