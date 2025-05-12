import { useSelector } from 'react-redux';
import css from './AllOrders.module.scss';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Skeleton from 'react-loading-skeleton';
import {
  selectOrderData,
  selectOrderLoading,
} from '../../redux/orders/selectors';
import { Order } from '../../redux/orders/slice';
import clsx from 'clsx';
import SimpleBarReact from 'simplebar-react';

import 'simplebar-react/dist/simplebar.min.css';

function AllOrders() {
  const data = useSelector(selectOrderData);
  const loading = useSelector(selectOrderLoading);

  const columnHelper = createColumnHelper<Order>();
  const columns = [
    columnHelper.accessor('name', {
      cell: info => {
        const row = info.row.original; // весь объект Customer
        return (
          <div className={css.tableUser}>
            {loading.order ? (
              <>
                <Skeleton count={1} circle={true} width={24} height={24} />
                <Skeleton count={1} />
              </>
            ) : (
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
            )}
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
          <div
            className={clsx(
              info.getValue().toLowerCase() === 'completed' && css.completed,
              info.getValue().toLowerCase() === 'confirmed' && css.confirmed,
              info.getValue().toLowerCase() === 'pending' && css.pending,
              info.getValue().toLowerCase() === 'cancelled' && css.cancelled,
              info.getValue().toLowerCase() === 'processing' && css.processing,
              info.getValue().toLowerCase() === 'shipped' && css.shipped,
              info.getValue().toLowerCase() === 'delivered' && css.delivered
            )}
          >
            {info.getValue()}
          </div>
        );
      },
      header: () => {
        return <span>Status</span>;
      },
    }),
  ];

  const table = useReactTable<Order>({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={css.tableWrap}>
      <h4 className={css.tableTitle}>All orders</h4>
      <SimpleBarReact style={{ maxWidth: 335 }} autoHide={false}>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className={css.tableTH}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading.order
              ? [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    {columns.map((_, j) => (
                      <td key={j}>
                        <Skeleton count={1} height={20} />
                        <Skeleton count={1} height={20} />
                      </td>
                    ))}
                  </tr>
                ))
              : table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </SimpleBarReact>
    </div>
  );
}

export default AllOrders;
