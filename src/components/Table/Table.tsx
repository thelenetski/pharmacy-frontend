import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import Skeleton from 'react-loading-skeleton';
import SimpleBarReact from 'simplebar-react';
import css from './Table.module.scss';
import clsx from 'clsx';

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  noBorders?: boolean;
  loading: boolean;
  title: string;
  scroll?: boolean;
  skeletonRows?: number;
}

function Table<T extends object>({
  data,
  columns,
  noBorders = false,
  loading,
  title,
  scroll = false,
  skeletonRows = 5,
}: Props<T>) {
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={clsx(css.tableWrap, noBorders && css.tableNoRightBorder)}>
      <h4 className={css.tableTitle}>{title}</h4>
      {data.length === 0 && !loading ? (
        <p className="errorNothingFound">Nothing found</p>
      ) : (
        <SimpleBarReact
          className={scroll && css.scrollPosition}
          autoHide={false}
        >
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
              {loading
                ? [...Array(skeletonRows)].map((_, i) => (
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

export default Table;
