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
      <SwiperSlide className={style.contendorImg}>
        <img src="" />
      </SwiperSlide>
    </Swiper>
  );
}
