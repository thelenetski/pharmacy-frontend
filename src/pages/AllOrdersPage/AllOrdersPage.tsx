import { useDispatch, useSelector } from 'react-redux';
import AllOrders from '../../components/AllOrders/AllOrders';
import css from './AllOrdersPage.module.scss';
import { AppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import { getOrder } from '../../redux/orders/operations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Virtual } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import {
  selectOrderPage,
  selectOrderTotalPages,
} from '../../redux/orders/selectors';
import Filters from '../../components/Filters/Filters';
import { selectFilters } from '../../redux/dashboard/selectors';
import { resetFilters } from '../../redux/dashboard/slice';
import { setSignOut } from '../../redux/auth/slice';

function AllOrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectOrderPage);
  const totalPages: number = useSelector(selectOrderTotalPages) || 1;
  const filters = useSelector(selectFilters);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    dispatch(resetFilters());
    setFirstLoad(false);
  }, [dispatch]);

  useEffect(() => {
    try {
      !firstLoad && dispatch(getOrder({ page: 1, filters }));
    } catch {
      dispatch(setSignOut());
    }
  }, [dispatch, filters, firstLoad]);

  return (
    <div className={css.ordersWrap}>
      <Filters />
      <Swiper
        onSlideChange={swiper => {
          const currentIndex = swiper.activeIndex + 1;
          if (page) {
            if (currentIndex > page) {
              dispatch(getOrder({ page: currentIndex, filters }));
            } else if (currentIndex < page) {
              dispatch(getOrder({ page: currentIndex, filters }));
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
        speed={0}
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
