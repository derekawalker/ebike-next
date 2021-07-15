import '../styles/global.scss';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
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
  faInfoCircle,
  faSuitcase,
  faHardHat,
  faDumbbell,
  faLock,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import * as gtag from '../lib/gtag';
import { BikeWrapper } from '../contexts/bikes';
import { CompanyWrapper } from '../contexts/companies';
import { BikeFiltersWrapper } from '../contexts/bike-filters';
import { BikeSortWrapper } from '../contexts/bike-sort';
import { BikeCompareWrapper } from '../contexts/bike-compare';

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
  faInfoCircle,
  faSuitcase,
  faHardHat,
  faDumbbell,
  faLock,
  faCaretDown
);

const App = ({ Component, pageProps, bikes }) => {
  const [compareList, setCompareList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <BikeWrapper>
      <CompanyWrapper>
        <BikeFiltersWrapper>
          <BikeSortWrapper>
            <BikeCompareWrapper>
              <Component
                {...pageProps}
                currentPage
                setCurrentPage
                compareList={compareList}
                setCompareList={setCompareList}
              />
            </BikeCompareWrapper>
          </BikeSortWrapper>
        </BikeFiltersWrapper>
      </CompanyWrapper>
    </BikeWrapper>
  );
};

export default App;
