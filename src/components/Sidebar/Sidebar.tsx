import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import css from './Sidebar.module.scss';
import { SlMenu } from 'react-icons/sl';
import { IoClose } from 'react-icons/io5';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import clsx from 'clsx';
import LogoutBtn from '../LogoutBtn/LogoutBtn';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const isDesktop = useMediaQuery({ minWidth: 1439 });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return !isDesktop ? (
    <>
      <button className={css.menuIcon} onClick={() => setIsOpen(!isOpen)}>
        <SlMenu size={30} />
      </button>
      <div className={clsx(css.maskBg, isOpen && css.maskBgOpen)}></div>
      <AnimatePresence initial={false}>
        <motion.nav
          ref={menuRef}
          className={css.menuWrap}
          initial={{ x: '-100%' }}
          animate={{ x: isOpen ? 0 : '-100%' }}
          exit={{ x: 0 }}
          transition={{ duration: 0.05 }}
        >
          <div>
            <div className={css.headWrap}>
              <button className={css.close} onClick={() => setIsOpen(false)}>
                <IoClose size={32} />
              </button>
            </div>
            <SidebarMenu />
          </div>
          <LogoutBtn />
        </motion.nav>
      </AnimatePresence>
    </>
  ) : (
    <motion.nav
      ref={menuRef}
      className={css.menuWrap}
      initial={{ x: 0 }}
      exit={{ x: 0 }}
      transition={{ duration: 0.05 }}
    >
      <div>
        <SidebarMenu />
      </div>
    </motion.nav>
  );
};

export default Sidebar;
