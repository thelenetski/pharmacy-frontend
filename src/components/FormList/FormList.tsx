import css from './FormList.module.scss';
import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

type FormListProps = {
  data: string[] | null;
  handler: (item: string) => void;
};

function FormList({ data, handler }: FormListProps) {
  return (
    <ul className={css.catList}>
      <SimpleBarReact style={{ maxHeight: 114 }} autoHide={false}>
        {data &&
          data.map((item, index) => {
            return (
              <li key={index} onClick={() => handler(item)}>
                {item}
              </li>
            );
          })}
      </SimpleBarReact>
    </ul>
  );
}

export default FormList;
