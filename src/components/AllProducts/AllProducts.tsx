import { useDispatch, useSelector } from 'react-redux';
import css from './AllProducts.module.scss';
import { createColumnHelper } from '@tanstack/react-table';
import {
  selectProductData,
  selectProductLoading,
} from '../../redux/products/selectors';
import { Product } from '../../redux/products/slice';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { modalTypes, openModal } from '../../redux/modal/slice';
import { AppDispatch } from '../../redux/store';
import Table from '../Table/Table';

const AllProducts = () => {
  const data = useSelector(selectProductData);
  const loading = useSelector(selectProductLoading);
  const dispatch = useDispatch<AppDispatch>();

  const columnHelper = createColumnHelper<Product>();
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
    columnHelper.accessor('category', {
      cell: info => {
        return <div className={css.category}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Category</span>;
      },
    }),
    columnHelper.accessor('stock', {
      cell: info => {
        return <div className={css.stock}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Stock</span>;
      },
    }),
    columnHelper.accessor('suppliers', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return <span>Suppliers</span>;
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
    columnHelper.accessor('_id', {
      cell: info => {
        return (
          <div className={css.actionGroup}>
            <button
              onClick={() => {
                dispatch(
                  openModal({
                    type: modalTypes.editProduct,
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
                    content: { type: 'product', id: info.getValue() },
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
      title="All products"
      data={data || []}
      loading={loading.product}
      columns={columns}
    />
  );
};

export default AllProducts;
