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
  faChevronDown,
  faChevronUp,
  faFilter,
  faSort,
} from '@fortawesome/free-solid-svg-icons';

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
  faCoins,
  faChevronDown,
  faChevronUp,
  faFilter,
  faSort
);

const App = ({ Component, pageProps, bikes }) => (
  <Component {...pageProps} currentPage setCurrentPage />
);

export default App;
