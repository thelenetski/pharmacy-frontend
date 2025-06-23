import { useSelector } from 'react-redux';
import css from './AllCustomers.module.scss';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {
  selectCustomersData,
  selectCustomersLoading,
} from '../../redux/customers/selectors';
import { Customer } from '../../redux/customers/slice';

function AllCustomers() {
  const data = useSelector(selectCustomersData);
  const loading = useSelector(selectCustomersLoading);

  const columnHelper = createColumnHelper<Customer>();
  const columns = [
    columnHelper.accessor('name', {
      cell: info => {
        const row = info.row.original;
        return (
          <div className={css.tableUser}>
            <>
              <img
                src={row.image}
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
        return <span>User Info</span>;
      },
    }),
    columnHelper.accessor('email', {
      cell: info => {
        return <div className={css.category}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Email</span>;
      },
    }),
    columnHelper.accessor('address', {
      cell: info => {
        return <div className={css.stock}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Address</span>;
      },
    }),
    columnHelper.accessor('phone', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Phone</span>;
      },
    }),
    columnHelper.accessor('register_date', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Register date</span>;
      },
      size: 270,
    }),
  ];

  const table = useReactTable<Customer>({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  });

  return (
    <div className={css.tableWrap}>
      <h4 className={css.tableTitle}>Customers Data</h4>
      {data && data.length === 0 ? (
        <p className="errorNothingFound">Nothing found</p>
      ) : (
        <SimpleBarReact style={{ maxWidth: 335 }} autoHide={false}>
          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className={css.tableTH}
                      style={{
                        width: header.getSize(),
                        maxWidth: header.column.columnDef.size,
                      }}
                    >
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
              {loading.customer
                ? [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      {columns.map((_, j) => (
                        <td key={j}>
                          <Skeleton count={1} height={32} />
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
      )}
    </div>
  );
}

export default AllCustomers;
