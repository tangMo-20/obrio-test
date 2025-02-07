import { THEME } from '@/constants';
import { Theme } from '@/types';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface Props {
  action: () => void;
  title: string;
  theme?: Theme;
  isSelected?: boolean;
}

export const Button = ({ action, title, theme = THEME.PRIMARY, isSelected = false }: Props) => {
  return (
    <div className={styles.root}>
      <div
        className={clsx(styles.button, styles[theme], { [styles.active]: isSelected })}
        onClick={action}
      >
        <span className="text-ellipsis-2" title={title}>
          {title}
        </span>
      </div>
    </div>
  );
};
