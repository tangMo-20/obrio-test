import Image from 'next/image';
import styles from './Header.module.scss';

interface Props {
  back: () => void;
  isBack: boolean;
  isPromo: boolean;
}

export const Header = ({ isBack, back, isPromo }: Props) => {
  return (
    <div className={styles.root}>
      {isBack && (
        <Image
          src={isPromo ? '/back-white.svg' : '/back.svg'}
          width={24}
          height={24}
          alt="Back"
          className={styles.back}
          onClick={back}
        />
      )}
      <Image src={isPromo ? '/logo-white.svg' : '/logo.svg'} width={24} height={24} alt="Logo" />
    </div>
  );
};
