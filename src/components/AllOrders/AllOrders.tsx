import { useSelector } from 'react-redux';
import css from './AllOrders.module.scss';
import { createColumnHelper } from '@tanstack/react-table';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  selectOrderData,
  selectOrderLoading,
} from '../../redux/orders/selectors';
import { Order } from '../../redux/orders/slice';
import Table from '../Table/Table';

function AllOrders() {
  const data = useSelector(selectOrderData);
  const loading = useSelector(selectOrderLoading);

  const columnHelper = createColumnHelper<Order>();
  const columns = [
    columnHelper.accessor('name', {
      cell: info => {
        const row = info.row.original;
        return (
          <div className={css.tableUser}>
            <>
              <img
                src={row.photo}
                alt={row.name}
                className={css.tableAvatar}
                width={24}
                height={24}
              />
              <span>{row.name}</span>
            </>
          </div>
        );
      },
      header: () => {
        return <span>User info</span>;
      },
    }),
    columnHelper.accessor('address', {
      cell: info => {
        return <div className={css.address}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Address</span>;
      },
    }),
    columnHelper.accessor('products', {
      cell: info => {
        return <div className={css.products}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Products</span>;
      },
    }),
    columnHelper.accessor('order_date', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Order date</span>;
      },
    }),
    columnHelper.accessor('price', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Price</span>;
      },
    }),
    columnHelper.accessor('status', {
      cell: info => {
        return (
          <div className={css[info.getValue().toLowerCase()]}>
            {info.getValue()}
          </div>
        );
      },
      header: () => {
        return <span>Status</span>;
      },
    }),
  ];

  return (
    <Table
      title="All orders"
      data={data || []}
      loading={loading.order}
      columns={columns}
    />
  );
}

export default AllOrders;
