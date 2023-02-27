import preloader from '../assets/preloader.gif';

export const Preloader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img src={preloader} style={{ width: '200px' }} alt="preloader" />
    </div>
  );
};
