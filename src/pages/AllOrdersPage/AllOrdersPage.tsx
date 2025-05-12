import { useDispatch, useSelector } from 'react-redux';
import AllOrders from '../../components/AllOrders/AllOrders';
import css from './AllOrdersPage.module.scss';
import { AppDispatch } from '../../redux/store';
import { useEffect } from 'react';
import { getOrder } from '../../redux/orders/operations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Virtual } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  selectOrderPage,
  selectOrderTotalPages,
} from '../../redux/orders/selectors';

function AllOrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectOrderPage);
  const totalPages: number = useSelector(selectOrderTotalPages) || 1;

  useEffect(() => {
    dispatch(getOrder({ page: 1 }));
  }, [dispatch]);

  return (
    <div className={css.ordersWrap}>
      <Swiper
        onSlideChange={swiper => {
          const currentIndex = swiper.activeIndex + 1;
          if (page) {
            if (currentIndex > page) {
              dispatch(getOrder({ page: page + 1 }));
            } else if (currentIndex < page) {
              dispatch(getOrder({ page: page - 1 }));
            }
          }
        }}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        allowTouchMove={false}
        modules={[Pagination, Virtual]}
        className={css.sliderTables}
        virtual
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <SwiperSlide
            key={index}
            virtualIndex={index}
            className={css.sliderSlide}
          >
            <AllOrders />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AllOrdersPage;
