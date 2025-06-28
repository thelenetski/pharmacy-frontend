import { createColumnHelper } from '@tanstack/react-table';
import css from './RecentCustomers.module.scss';
import { useSelector } from 'react-redux';
import {
  selectDasboardData,
  selectDasboardLoading,
} from '../../redux/dashboard/selectors';
import { Customer } from '../../redux/dashboard/slice';
import Table from '../Table/Table';

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

  return (
    <Table
      title="Recent customers"
      data={data?.latestCustomers || []}
      loading={loading.dash}
      columns={columns}
      scroll={true}
    />
  );
}

export default RecentCustomers;
