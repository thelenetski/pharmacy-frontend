import { useDispatch, useSelector } from 'react-redux';
import css from './AllSuppliers.module.scss';
import { createColumnHelper } from '@tanstack/react-table';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { modalTypes, openModal } from '../../redux/modal/slice';
import { AppDispatch } from '../../redux/store';
import {
  selectSuppliersData,
  selectSuppliersLoading,
} from '../../redux/suppliers/selectors';
import { Supplier } from '../../redux/suppliers/slice';
import Table from '../Table/Table';

function AllSuppliers() {
  const data = useSelector(selectSuppliersData);
  const loading = useSelector(selectSuppliersLoading);
  const dispatch = useDispatch<AppDispatch>();

  const columnHelper = createColumnHelper<Supplier>();
  const columns = [
    columnHelper.accessor('name', {
      cell: info => {
        const row = info.row.original;
        return (
          <div className={css.tableUser}>
            <span>{row.name}</span>
          </div>
        );
      },
      header: () => {
        return <span>Product Info</span>;
      },
    }),
    columnHelper.accessor('address', {
      cell: info => {
        return <div className={css.category}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Address</span>;
      },
    }),
    columnHelper.accessor('suppliers', {
      cell: info => {
        return <div className={css.stock}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Company</span>;
      },
    }),
    columnHelper.accessor('date', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Delivery date</span>;
      },
    }),
    columnHelper.accessor('amount', {
      cell: info => {
        return (
          <div className={css.cellPadding}>
            {info
              .getValue()
              .replace(/^[^\d.-]+/, '')
              .trim()}
          </div>
        );
      },
      header: () => {
        return <span>Amount</span>;
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
    columnHelper.accessor('_id', {
      cell: info => {
        return (
          <div className={css.actionGroup}>
            <button
              onClick={() => {
                dispatch(
                  openModal({
                    type: modalTypes.editSupplier,
                    content: data?.find(p => p._id === info.getValue()) ?? null,
                  })
                );
              }}
              className="edit"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              onClick={() => {
                dispatch(
                  openModal({
                    type: modalTypes.delete,
                    content: { type: 'supplier', id: info.getValue() },
                  })
                );
              }}
              className="delete"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        );
      },
      header: () => {
        return <span>Action</span>;
      },
    }),
  ];

  return (
    <Table
      title="All suppliers"
      data={data || []}
      loading={loading.supplier}
      columns={columns}
    />
  );
}

export default AllSuppliers;
