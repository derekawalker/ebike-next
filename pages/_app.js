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
  faPlusCircle,
  faTimesCircle,
  faWeight,
  faUserFriends,
  faCoins,
  faChevronDown,
  faChevronUp,
  faFilter,
  faSort,
  faThList,
  faSearch,
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
  faPlusCircle,
  faTimesCircle,
  faWeight,
  faUserFriends,
  faCoins,
  faChevronDown,
  faChevronUp,
  faFilter,
  faSort,
  faThList,
  faSearch,
  faCaretDown
);

const App = ({ Component, pageProps, bikes }) => {
  const [bikesState, setBikesState] = useState([]);
  const [companiesState, setCompaniesState] = useState([]);
  const [filterSelections, setFilterSelections] = useState({
    min_price: '0',
    max_price: '0',
    motor: '0',
    battery: '0',
    range: '0',
    top_speed: '0',
    voltage: '0',
    suspension: '0',
    manufacturer: '0',
  });
  const [sortSelections, setSortSelections] = useState({
    field: 'price',
    type: 'string',
    direction: 'asc',
  });
  const [compareList, setCompareList] = useState([]);

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
      compareList={compareList}
      setCompareList={setCompareList}
    />
  );
};

export default App;
