// ejemplo en componente
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import style from '@/styles/inicio/Carrusel.module.css'

export default function Carrusel() {
  return (
    <Swiper
    className={style.carrusel}
    spaceBetween={0}
    slidesPerView={1}
    loop={true}
    speed={1000}
    effect='flip'
    modules={[Navigation]}
    navigation={true}
     >
      <SwiperSlide className={style.contenedor_imagen}><img src="/principales/xbox.jpg" /></SwiperSlide>
      <SwiperSlide className={style.contenedor_imagen}><img src="/principales/computadora.jpg" /></SwiperSlide>
      <SwiperSlide className={style.contenedor_imagen}><img src="/principales/consolas.jpg" /></SwiperSlide>
      <SwiperSlide className={style.contenedor_imagen}><img src="/principales/tenis.jpg" /></SwiperSlide>  
      <SwiperSlide className={style.contenedor_imagen}><img src="/principales/futbol.jpg" /></SwiperSlide>
      <SwiperSlide className={style.contenedor_imagen}><img src="/principales/iphone.jpg" /></SwiperSlide>

    </Swiper>
  );
}
