import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <nav className={styles.root}>
      <div>
        <a href="#">Notes</a>
        <a href="#">Coffee</a>
        <a href="#">Run</a>
        <a href="#">Code</a>
      </div>
    </nav>
  );
};

export default Sidebar;
