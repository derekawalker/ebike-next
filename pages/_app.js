import '../styles/global.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTimes,
  faBars,
  faMotorcycle,
  faSlidersH,
  faCommentDots,
  faCogs,
  faBatteryFull,
  faBolt,
  faRoad,
  faTachometerAlt,
  faDatabase,
  faRecordVinyl,
  faLightbulb,
  faCog,
  faWeight,
  faUserFriends,
  faCoins,
} from '@fortawesome/free-solid-svg-icons';
import { BikeProvider } from '../contexts/BikeContext';

library.add(
  faTimes,
  faBars,
  faMotorcycle,
  faSlidersH,
  faCommentDots,
  faCogs,
  faBatteryFull,
  faBolt,
  faRoad,
  faTachometerAlt,
  faDatabase,
  faRecordVinyl,
  faLightbulb,
  faCog,
  faWeight,
  faUserFriends,
  faCoins
);

const App = ({ Component, pageProps }) => (
  <BikeProvider>
    <Component {...pageProps} currentPage setCurrentPage />
  </BikeProvider>
);

export default App;
