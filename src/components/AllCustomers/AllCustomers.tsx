import { useSelector } from 'react-redux';
import css from './AllCustomers.module.scss';
import { createColumnHelper } from '@tanstack/react-table';
import {
  selectCustomersData,
  selectCustomersLoading,
} from '../../redux/customers/selectors';
import { Customer } from '../../redux/customers/slice';
import Table from '../Table/Table';

const AllCustomers = () => {
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

  return (
    <Table
      title="Customers Data"
      data={data || []}
      loading={loading.customer}
      columns={columns}
    />
  );
};

export default AllCustomers;
