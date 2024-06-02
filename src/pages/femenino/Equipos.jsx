import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';

import BIM_logo from '../../assets/images/BIM_logo.webp';
import NOT_logo from '../../assets/images/NOT_logo.webp';
import MAL_logo from '../../assets/images/MAL_logo.webp';
import MUC_logo from '../../assets/images/MUC_logo.webp';
import DES_logo from '../../assets/images/DES_logo.webp';
import { useNavigate } from 'react-router-dom';

const equipos = [
  { id: 1, nombre: 'Bimbineta F. C.', logo: BIM_logo, abreviatura: 'BIM' },
  { id: 2, nombre: 'Nottingham Miedo', logo: NOT_logo, abreviatura: 'NOT' },
  { id: 3, nombre: 'La Mala F. C.', logo: MAL_logo, abreviatura: 'MAL' },
  { id: 4, nombre: 'Muchachas', logo: MUC_logo, abreviatura: 'MUC' },
  { id: 5, nombre: 'Descaro F. C.', logo: DES_logo, abreviatura: 'DES' },
];

function Equipos() {
  const navigate = useNavigate();
  const [currentEquipo, setCurrentEquipo] = useState(null);

  const handleSlideChange = (swiper) => {
    const activeIndex = (swiper.realIndex) % equipos.length;
    setCurrentEquipo(equipos[activeIndex].nombre);
  };

  const handleImageClick = (abreviatura) => {
    navigate(`/femenino/equipos/${abreviatura}`);
  };

  return (
    <div className="equipos-container" style={{ height: '91vh' }}>
      <h1 className="w-full font-poppins font-semibold text-[32px] text-white leading-[35px] xl:text-[50px] xl:leading-[75px] mb-2 text-center">
        <span className="text-gradient">Equipos</span>
      </h1>
      <div
        className="current-team text-5xl font-bold text-white mt-2 text-center transition-all ease-in-out"
        style={{
          opacity: currentEquipo ? 1 : 0,
          visibility: currentEquipo ? 'visible' : 'hidden',
          textShadow: currentEquipo ? '0 0 5px rgba(255, 255, 255, 0.2), 0 0 10px rgba(255, 255, 255, 0.3), 0 0 15px rgba(255, 255, 255, 0.3)' : 'none'
        }}
      >
        {currentEquipo}
      </div>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
        onSlideChange={handleSlideChange}
        onInit={(swiper) => {
          // Inicializar con el primer equipo
          setCurrentEquipo(equipos[swiper.realIndex % equipos.length].nombre);
        }}
      >
        {equipos.map((equipo) => (
          <SwiperSlide key={equipo.id}>
            <img
              src={equipo.logo}
              alt={equipo.nombre}
              onClick={() => handleImageClick(equipo.abreviatura)}
            />
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="swiper-button-prev text-black slider-arrow">
            <IoArrowBackOutline size={12} />
          </div>
          <div className="swiper-button-next text-black slider-arrow">
            <IoArrowForwardOutline size={12} />
          </div>
          <div className="swiper-pagination"style={{ display: 'flex', justifyContent: 'center' }}></div>
        </div>
      </Swiper>
    </div>
  );
}

export default Equipos;
