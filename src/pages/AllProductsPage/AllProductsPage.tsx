import { useDispatch, useSelector } from 'react-redux';
import css from './AllProductsPage.module.scss';
import { AppDispatch } from '../../redux/store';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Virtual } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import Filters from '../../components/Filters/Filters';
import { getProducts } from '../../redux/products/operations';
import {
  selectProductPage,
  selectProductTotalPages,
} from '../../redux/products/selectors';
import AllProducts from '../../components/AllProducts/AllProducts';
import { resetFilters } from '../../redux/dashboard/slice';
import { setSignOut } from '../../redux/auth/slice';
import { selectFilters } from '../../redux/dashboard/selectors';
import AddButton from '../../components/AddButton/AddButton';
import { modalTypes } from '../../redux/modal/slice';

function AllProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectProductPage);
  const filters = useSelector(selectFilters);
  const totalPages: number = useSelector(selectProductTotalPages) || 1;
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    dispatch(resetFilters());
    setFirstLoad(false);
  }, [dispatch]);

  useEffect(() => {
    try {
      !firstLoad && dispatch(getProducts({ page: 1, filters }));
    } catch {
      dispatch(setSignOut());
    }
  }, [dispatch, filters, firstLoad]);

  return (
    <div className={css.productsWrap}>
      <Filters name="Product Name" />
      <AddButton type={modalTypes.addProduct} />
      <Swiper
        onSlideChange={swiper => {
          const currentIndex = swiper.activeIndex + 1;
          if (page) {
            if (currentIndex > page) {
              dispatch(getProducts({ page: currentIndex, filters }));
            } else if (currentIndex < page) {
              dispatch(getProducts({ page: currentIndex, filters }));
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
            <AllProducts />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AllProductsPage;
