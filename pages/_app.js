import '../styles/global.scss';
import { useState } from 'react';
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
  faCaretDown,
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
  faSort,
  faCaretDown
);

const App = ({ Component, pageProps, bikes }) => {
  const [bikesState, setBikesState] = useState([]);
  const [companiesState, setCompaniesState] = useState([]);
  const [filterSelections, setFilterSelections] = useState({
    price: '0',
    motor: '0',
    battery: '0',
    range: '0',
    top_speed: '0',
    voltage: '0',
    suspension: '0',
  });
  const [sortSelections, setSortSelections] = useState({
    field: 'price',
    type: 'string',
    direction: 'asc',
  });
  return (
    <Component
      {...pageProps}
      currentPage
      setCurrentPage
      bikesState={bikesState}
      setBikesState={setBikesState}
      companiesState={companiesState}
      setCompaniesState={setCompaniesState}
      filterSelections={filterSelections}
      setFilterSelections={setFilterSelections}
      sortSelections={sortSelections}
      setSortSelections={setSortSelections}
    />
  );
};

export default App;
