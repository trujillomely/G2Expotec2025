import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ServicesPage() {
  const testimonials = [
    {
      text: 'Sed ea amet kasd elitr stet nonumy...',
      name: 'Client Name',
      role: 'Profession',
      img: '/img/testimonial-1.jpg',
    },
    {
      text: 'Sed ea amet kasd elitr stet nonumy...',
      name: 'Client Name',
      role: 'Profession',
      img: '/img/testimonial-2.jpg',
    },
    {
      text: 'Sed ea amet kasd elitr stet nonumy...',
      name: 'Client Name',
      role: 'Profession',
      img: '/img/testimonial-3.jpg',
    },
    {
      text: 'Sed ea amet kasd elitr stet nonumy...',
      name: 'Client Name',
      role: 'Profession',
      img: '/img/testimonial-4.jpg',
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const services = [
    { icon: 'fa-laptop-code', title: 'Web Design' },
    { icon: 'fa-code', title: 'Development' },
    { icon: 'fa-envelope-open-text', title: 'Marketing' },
    { icon: 'fa-chart-line', title: 'Strategy' },
    { icon: 'fa-search', title: 'SEO' },
    { icon: 'fa-pen', title: 'Content Writing' },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="container-fluid page-header d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5 mb-5">
        <h1 className="display-4 text-white mb-3 mt-0 mt-lg-5">Services</h1>
        <div className="d-inline-flex text-white">
          <p className="m-0"><a className="text-white" href="/">Home</a></p>
          <p className="m-0 px-2">/</p>
          <p className="m-0">Services</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="container-fluid pt-5 pb-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-6 text-center mb-5">
              <small className="bg-primary text-white text-uppercase font-weight-bold px-1">What we do</small>
              <h1 className="mt-2 mb-3">We Offer Creative Services</h1>
              <h4 className="font-weight-normal text-muted mb-4">
                Lorem ut kasd dolores elitr sed est duo ea ipsum justo diam, est erat lorem. Est magna sea clita diam tempor elitr
              </h4>
              <a href="/about" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold">Discover More</a>
            </div>
          </div>
          <div className="row">
            {services.map((service, i) => (
              <div className="col-md-4 mb-5" key={i}>
                <div className="d-flex">
                  <i className={`fa fa-3x ${service.icon} text-primary mr-4`}></i>
                  <div className="d-flex flex-column">
                    <h4 className="font-weight-bold mb-3">{service.title}</h4>
                    <p>
                      Et kasd justo clita amet kasd, vero amet vero eos kasd diam justo, ipsum diam sed elitr erat
                    </p>
                    <a className="font-weight-semi-bold" href="/services">Read More <i className="fa fa-angle-double-right"></i></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container-fluid pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-5">
              <small className="bg-primary text-white text-uppercase font-weight-bold px-1">What clients say</small>
              <h1 className="mt-2 mb-3">Clients Say About Our Services</h1>
              <h4 className="font-weight-normal text-muted mb-4">
                Lorem ut kasd elitr sed est duo ea ipsum justo diam, est erat lorem clita diam elitr
              </h4>
              <a href="/contact" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold">Submit Review</a>
            </div>
            <div className="col-lg-8 mb-5">
              <Slider {...sliderSettings}>
                {testimonials.map((item, i) => (
                  <div className="testimonial-item px-3" key={i}>
                    <div className="testimonial-text position-relative border mb-4 p-4">
                      {item.text}
                    </div>
                    <div className="d-flex align-items-center">
                      <img className="img-fluid rounded-circle" src={item.img} style={{ width: '80px', height: '80px' }} alt={item.name} />
                      <div className="pl-4">
                        <h6 className="font-weight-bold">{item.name}</h6>
                        <i className="text-muted">{item.role}</i>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServicesPage;
