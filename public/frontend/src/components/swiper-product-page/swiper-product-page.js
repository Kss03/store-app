import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/mousewheel";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";


export default function SwiperProductPage({imagesArr}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    //в завизимости от ширины экрана задаем направление работы слайдера (брейкпоинты не хотят работать:)
    let swiperDirection = (document.documentElement.clientWidth > 992) ? 'vertical' : 'horizontal';

    // динамически формируем слайдер в зависимости от кол-ва картинок( в пропсах принимаем массив и разбираем его )
    const swiperSlides = imagesArr.map(item => {
        return (
            <SwiperSlide className="slider__image" key={item}>
                <img src={item} alt=""/>
            </SwiperSlide>
        )
    })



    return (
        <section className="slider">
            <div className="slider__flex d-flex align-items-start">
                <div className="slider__col me-3 mt-2 mt-md-3 mt-lg-0">
                    <Swiper
                        // параметры слайдера
                        onSwiper={setThumbsSwiper}
                        direction={swiperDirection}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={"auto"}
                        mousewheel={true}
                        grabCursor={true}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="slider__thumbs ms-0"

                    >
                        {/* массив со слайдами */}
                        {swiperSlides}
                    </Swiper>
                </div>

                <Swiper
                    // параметры слайдера
                    loop={true}
                    slidesPerView={1} // показывать по 1 изображению
                    direction={swiperDirection}
                    mousewheel={true}
                    grabCursor={true}
                    spaceBetween={32}
                    navigation={false}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} // со стандартным thumbs из документации не работало(без понятия почему), а это нагуглил
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="slider__images"

                >
                    {/* массив со слайдами */}
                    {swiperSlides}
                </Swiper>
            </div>
        </section>


    );
}
