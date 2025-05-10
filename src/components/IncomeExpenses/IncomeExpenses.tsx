import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import css from './IncomeExpenses.module.scss';
import { useSelector } from 'react-redux';
import {
  selectDasboardData,
  selectDasboardLoading,
} from '../../redux/dashboard/selectors';
import { IncomeExpense } from '../../redux/dashboard/slice';
import Skeleton from 'react-loading-skeleton';
import clsx from 'clsx';

function IncomeExpenses() {
  const data = useSelector(selectDasboardData);
  const loading = useSelector(selectDasboardLoading);

  const columnHelper = createColumnHelper<IncomeExpense>();
  const columns = [
    columnHelper.accessor('type', {
      cell: info => {
        return (
          <div className={css.tableType}>
            <span
              className={clsx(
                info.getValue().toLowerCase() === 'expense' && css.expense,
                info.getValue().toLowerCase() === 'income' && css.income,
                info.getValue().toLowerCase() === 'error' && css.error
              )}
            >
              {info.getValue()}
            </span>
          </div>
        );
      },
      header: () => {
        return <span>Today</span>;
      },
    }),
    columnHelper.accessor('name', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return <span></span>;
      },
    }),
    columnHelper.accessor('amount', {
      cell: info => {
        const row = info.row.original;
        return (
          <div
            className={clsx(
              row.type.toLowerCase() === 'expense' && css.greenAmount,
              row.type.toLowerCase() === 'income' && css.redAmount,
              row.type.toLowerCase() === 'error' && css.strokeAmount
            )}
          >
            {info.getValue()}
          </div>
        );
      },
      header: () => {
        return <span></span>;
      },
    }),
  ];

  const table = useReactTable<IncomeExpense>({
    data: data?.incomeExpenses || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={css.tableWrap}>
      <h4 className={css.tableTitle}>Income/Expenses</h4>
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

export default IncomeExpenses;
