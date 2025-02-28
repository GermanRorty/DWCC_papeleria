"use client";

import { useEffect } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

const Slide = ({ src, alt, isActive }) => {
  return (
    <div className={`carousel-item h-100 ${isActive ? "active" : ""}`}>
      <Image src={src} sizes="1000" fill className="object-cover" alt={alt} />
    </div>
  );
};

const Carousel = () => {
  const slides = Array.from({ length: 10 }, (_, i) => `/images/carousel/slide${i + 1}.jpg`);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => { //Esto asegura que bootstrap solo se importe en el cliente, evitando problemas con SSR.
      const carouselElement = document.getElementById("imageCarousel");
      new bootstrap.Carousel(carouselElement, {
        ride: "carousel",
        interval: 3000,
      });
    });
  }, []);

  return (
    <div
      id="imageCarousel"
      className="carousel slide carousel-fade position-absolute w-full h-full"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-inner h-100">
        {slides.map((src, index) => (
          <Slide key={index} src={src} alt={`Slide ${index + 1}`} isActive={index === 0} />
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#imageCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default Carousel;
