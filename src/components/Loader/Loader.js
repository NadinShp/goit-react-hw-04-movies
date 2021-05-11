import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loaders = () => (
  <div className={styles.loader}>
    <Loader type="Circles" color="#00BFFF" height={80} width={80} />
  </div>
);
export default Loaders;
