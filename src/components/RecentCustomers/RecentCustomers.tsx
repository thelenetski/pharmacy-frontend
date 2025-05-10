import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import css from './RecentCustomers.module.scss';
import { useSelector } from 'react-redux';
import {
  selectDasboardData,
  selectDasboardLoading,
} from '../../redux/dashboard/selectors';
import { Customer } from '../../redux/dashboard/slice';
import Skeleton from 'react-loading-skeleton';

function RecentCustomers() {
  const data = useSelector(selectDasboardData);
  const loading = useSelector(selectDasboardLoading);

  const columnHelper = createColumnHelper<Customer>();
  const columns = [
    columnHelper.accessor('name', {
      cell: info => {
        const row = info.row.original; // весь объект Customer
        return (
          <div className={css.tableUser}>
            {loading.dash ? (
              <>
                <Skeleton count={1} circle={true} width={24} height={24} />
                <Skeleton count={1} />
              </>
            ) : (
              <>
                <img
                  src={row.image || row.photo}
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
        return <span>Name</span>;
      },
    }),
    columnHelper.accessor('email', {
      cell: info => {
        return <div className={css.email}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Email</span>;
      },
    }),
    columnHelper.accessor('spent', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Spent</span>;
      },
    }),
  ];

  const table = useReactTable<Customer>({
    data: data?.latestCustomers || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={css.tableWrap}>
      <h4 className={css.tableTitle}>Recent Customers</h4>
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
          {loading.dash
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
    </div>
  );
}

export default RecentCustomers;
