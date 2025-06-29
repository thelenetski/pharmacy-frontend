import { useDispatch, useSelector } from 'react-redux';
import css from './AllSuppliersPage.module.scss';
import { AppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Virtual } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import Filters from '../../components/Filters/Filters';
import { resetFilters } from '../../redux/dashboard/slice';
import { setSignOut } from '../../redux/auth/slice';
import { selectFilters } from '../../redux/dashboard/selectors';
import AddButton from '../../components/AddButton/AddButton';
import { modalTypes } from '../../redux/modal/slice';
import { getSuppliers } from '../../redux/suppliers/operations';
import AllSuppliers from '../../components/AllSuppliers/AllSuppliers';
import {
  selectSuppliersPage,
  selectSuppliersTotalPages,
} from '../../redux/suppliers/selectors';

function AllSuppliersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectSuppliersPage);
  const filters = useSelector(selectFilters);
  const totalPages: number = useSelector(selectSuppliersTotalPages) || 1;
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    dispatch(resetFilters());
    setFirstLoad(false);
  }, [dispatch]);

  useEffect(() => {
    try {
      !firstLoad && dispatch(getSuppliers({ page: 1, filters }));
    } catch {
      dispatch(setSignOut());
    }
  }, [dispatch, filters, firstLoad]);

  return (
    <div className={css.suppliersWrap}>
      <div className={css.pageActions}>
        <Filters name="Supplier Name" />
        <AddButton name="Add a new supplier" type={modalTypes.addSupplier} />
      </div>
      <Swiper
        onSlideChange={swiper => {
          const currentIndex = swiper.activeIndex + 1;
          if (page) {
            if (currentIndex > page) {
              dispatch(getSuppliers({ page: currentIndex, filters }));
            } else if (currentIndex < page) {
              dispatch(getSuppliers({ page: currentIndex, filters }));
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
            <AllSuppliers />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AllSuppliersPage;
