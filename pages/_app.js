import '../styles/global.scss';
import { BikeProvider } from '../contexts/BikeContext';

const App = ({ Component, pageProps }) => (
  <BikeProvider>
    <Component {...pageProps} currentPage setCurrentPage />
  </BikeProvider>
);

export default App;
