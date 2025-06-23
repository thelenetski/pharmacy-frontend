import { useDispatch, useSelector } from 'react-redux';
import css from './AllProducts.module.scss';
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
  selectProductData,
  selectProductLoading,
} from '../../redux/products/selectors';
import { Product } from '../../redux/products/slice';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { modalTypes, openModal } from '../../redux/modal/slice';
import { AppDispatch } from '../../redux/store';

function AllProducts() {
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
            {loading.product ? (
              <>
                <Skeleton count={1} />
              </>
            ) : (
              <span>{row.name}</span>
            )}
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

  const table = useReactTable<Product>({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={css.tableWrap}>
      <h4 className={css.tableTitle}>All products</h4>
      {data && data.length === 0 ? (
        <p className="errorNothingFound">Nothing found</p>
      ) : (
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
              {loading.product
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

export default AllProducts;
