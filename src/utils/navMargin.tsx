export const navMargin = (ref: HTMLDivElement | null) => {
  // const windowHeight = window.innerHeight;

  if (ref) {
    const rect = ref.getBoundingClientRect();
    const paginationEl = document.querySelector(
      '.swiper-pagination-bullets'
    ) as HTMLElement | null;
    if (paginationEl) {
      // paginationEl.style.bottom = `${Math.round(
      //   windowHeight - rect.bottom - 32
      // )}px`;
      paginationEl.style.bottom = `25px`;
    }
    console.log(rect);
  }
};
