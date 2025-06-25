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
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const getSwiperStyleBullets = (
    total: number,
    current: number,
    maxVisible = 5
  ): number[] => {
    const half = Math.floor(maxVisible / 2);

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i);
    }

    if (current <= half) {
      return Array.from({ length: maxVisible }, (_, i) => i);
    }

    if (current >= total - half - 1) {
      return Array.from(
        { length: maxVisible },
        (_, i) => total - maxVisible + i
      );
    }

    return Array.from({ length: maxVisible }, (_, i) => current - half + i);
  };

  return (
    <div className={css.productsWrap}>
      <Filters name="Product Name" />
      <AddButton type={modalTypes.addProduct} />
      <Swiper
        onSwiper={setSwiperInstance}
        onSlideChange={swiper => {
          const newIndex = swiper.activeIndex;

          setActiveIndex(newIndex);

          if (page !== newIndex + 1) {
            dispatch(getProducts({ page: newIndex + 1, filters }));
          }
        }}
        spaceBetween={20}
        slidesPerView={1}
        pagination={false}
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
            <div className={css.paginationWrap}>
              {getSwiperStyleBullets(totalPages, activeIndex).map(index => (
                <button
                  key={index}
                  className={`${css.bullet} ${
                    index === activeIndex ? css.active : ''
                  }`}
                  onClick={() => swiperInstance?.slideTo(index, 0)}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AllProductsPage;
