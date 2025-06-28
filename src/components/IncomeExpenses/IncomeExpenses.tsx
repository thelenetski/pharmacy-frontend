import { createColumnHelper } from '@tanstack/react-table';
import css from './IncomeExpenses.module.scss';
import { useSelector } from 'react-redux';
import {
  selectDasboardData,
  selectDasboardLoading,
} from '../../redux/dashboard/selectors';
import { IncomeExpense } from '../../redux/dashboard/slice';
import clsx from 'clsx';
import Table from '../Table/Table';

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

  return (
    <Table
      title="Income/Expenses"
      data={data?.incomeExpenses || []}
      loading={loading.dash}
      columns={columns}
      noBorders={true}
    />
  );
}

export default IncomeExpenses;
