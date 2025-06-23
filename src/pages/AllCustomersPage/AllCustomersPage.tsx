import { useDispatch, useSelector } from 'react-redux';
import css from './AllCustomersPage.module.scss';
import { AppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Virtual } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import Filters from '../../components/Filters/Filters';
import { resetFilters } from '../../redux/dashboard/slice';
import { setSignOut } from '../../redux/auth/slice';
import { selectFilters } from '../../redux/dashboard/selectors';
import { getCustomers } from '../../redux/customers/operations';
import {
  selectCustomersPage,
  selectCustomersTotalPages,
} from '../../redux/customers/selectors';
import AllCustomers from '../../components/AllCustomers/AllCustomers';

function AllCustomersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectCustomersPage);
  const filters = useSelector(selectFilters);
  const totalPages: number = useSelector(selectCustomersTotalPages) || 1;
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    dispatch(resetFilters());
    setFirstLoad(false);
  }, [dispatch]);

  useEffect(() => {
    try {
      !firstLoad && dispatch(getCustomers({ page: 1, filters }));
    } catch {
      dispatch(setSignOut());
    }
  }, [dispatch, filters, firstLoad]);

  return (
    <div className={css.suppliersWrap}>
      <Filters name="User Name" />
      <Swiper
        onSlideChange={swiper => {
          const currentIndex = swiper.activeIndex + 1;
          if (page) {
            if (currentIndex > page) {
              dispatch(getCustomers({ page: currentIndex, filters }));
            } else if (currentIndex < page) {
              dispatch(getCustomers({ page: currentIndex, filters }));
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
            <AllCustomers />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AllCustomersPage;
