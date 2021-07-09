import { useState } from 'react';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import BikeFilters from '../../components/BikeFilters';
import BikeSorting from '../../components/BikeSorting';
import Stat from '../../components/Stat';
import { useBikeContext } from '../../contexts/bikes';
import { useCompanyContext } from '../../contexts/companies';
import { useBikeFiltersContext } from '../../contexts/bike-filters';
import { useBikeSortContext } from '../../contexts/bike-sort';
import { useBikeCompareContext } from '../../contexts/bike-compare';

// Styles
import { variables } from '../../styles/style-variables';

const bikeUrl = 'https://data.ebikecompanies.com/api/bikes';
const companiesUrl = 'https://data.ebikecompanies.com/api/companies';

export const getStaticProps = async () => {
  const bikeResponse = await fetch(bikeUrl);
  const bikeData = await bikeResponse.json();

  const companyResponse = await fetch(companiesUrl);
  const companyData = await companyResponse.json();

  return {
    props: {
      bikes: bikeData,
      companies: companyData,
    },
    revalidate: 1,
  };
};

const Bikes = ({ bikes, companies }) => {
  const [filtersShown, setFiltersShown] = useState(false);
  const [bikesState, setBikesState] = useBikeContext();
  const [companiesState, setCompaniesState] = useCompanyContext();
  const [bikeFiltersState, setBikeFiltersState] = useBikeFiltersContext();
  const [bikeSortState, setBikeSortState] = useBikeSortContext();
  const [bikeCompareState, setBikeCompareState] = useBikeCompareContext();

  const handleFilterToggle = () => {
    setFiltersShown(!filtersShown);
  };

  const handleCompareClick = (id) => {
    if (bikeCompareState.includes(id)) {
      const newList = bikeCompareState.filter((item) => item !== id);
      setBikeCompareState(newList);
    } else {
      setBikeCompareState([...bikeCompareState, id]);
    }
  };

  if (bikes !== bikesState) {
    setBikesState(bikes);
  }

  if (companies !== companiesState) {
    setCompaniesState(companies);
  }

  // Apply filters.
  let filteredBikes = bikesState;

  // Min Price.
  if (bikeFiltersState.min_price !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.price) >= Number(bikeFiltersState.min_price)
    );
  }

  // Max Price.
  if (bikeFiltersState.max_price !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.price) <= Number(bikeFiltersState.max_price)
    );
  }

  // Motor.
  if (bikeFiltersState.motor !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.motor) >= Number(bikeFiltersState.motor)
    );
  }

  // Battery.
  if (bikeFiltersState.battery !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.battery) >= Number(bikeFiltersState.battery)
    );
  }

  // Voltage.
  if (bikeFiltersState.voltage !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.voltage) >= Number(bikeFiltersState.voltage)
    );
  }

  // Range.
  if (bikeFiltersState.range !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.range) >= Number(bikeFiltersState.range)
    );
  }

  // Top Speed.
  if (bikeFiltersState.top_speed !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.top_speed) >= Number(bikeFiltersState.top_speed)
    );
  }

  // Suspension.
  if (bikeFiltersState.suspension !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) =>
        bike.suspension.toLowerCase() ===
        bikeFiltersState.suspension.toLowerCase()
    );
  }

  // Manufacturer.
  if (bikeFiltersState.manufacturer !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => bike.manufacturer_id === bikeFiltersState.manufacturer
    );
  }

  // Apply sort.
  if (bikeSortState.field) {
    filteredBikes = _.sortBy(filteredBikes, [
      (bike) => {
        const { field } = bikeSortState;
        if (bikeSortState.type === 'number') {
          return Number(bike[field]);
        }
        return bike[field];
      },
      'title',
    ]);

    if (bikeSortState.direction !== 'asc') {
      filteredBikes.reverse();
    }
  }

  let bikeOutput = filteredBikes.map((bike) => (
    <div
      className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2 relative"
      key={bike.bike_id}
    >
      <Link
        href={`/bikes/${bike.manufacturer
          .replace(/\s+/g, '-')
          .toLowerCase()}/${bike.title.replace(/\s+/g, '-').toLowerCase()}/${
          bike.bike_id
        }`}
        passHref
      >
        <a href="placeholder" className="block relative z-0">
          <Card
            title={bike.title}
            image={bike.thumbnail}
            fit="responsive"
            rounded
          >
            <div className="-mt-2 mb-3 uppercase text-xs text-gray-700 tracking-wider font-thin">
              {bike.manufacturer}
            </div>
            <div className=" font-bold mb-3 border-t pt-3 text-xl text-green-500">
              {formatMoney(bike.price)}
            </div>
            <div className="flex flex-row flex-wrap pb-9">
              <div className="w-1/2">
                <Stat title="Motor">{bike.motor} W</Stat>
              </div>

              <div className="w-1/2">
                <Stat title="Battery">{bike.battery} Ah</Stat>
              </div>

              <div className="w-1/2">
                <Stat title="Volts">{bike.voltage} V</Stat>
              </div>

              <div className="w-1/2">
                <Stat title="Top Speed">{bike.top_speed} mph</Stat>
              </div>

              <div className="w-1/2">
                <Stat title="Range">{bike.range} miles</Stat>
              </div>

              <div className="w-1/2">
                <Stat title="Suspension">{bike.suspension}</Stat>
              </div>
            </div>
          </Card>
        </a>
      </Link>
      <div className="absolute z-10 bottom-2 left-2 right-2 text-sm opacity-75 hover:opacity-100 focus:opacity-100">
        <button
          onClick={() => handleCompareClick(bike.bike_id)}
          type="button"
          className={`px-2 py-1 block w-full rounded-b-lg  text-left uppercase tracking-wider text-white ${
            bikeCompareState.includes(bike.bike_id)
              ? 'bg-red-400 hover:bg-red-500'
              : 'bg-blue-400 hover:bg-blue-500'
          }`}
        >
          <FontAwesomeIcon
            icon={
              bikeCompareState.includes(bike.bike_id)
                ? 'times-circle'
                : 'plus-circle'
            }
            className=""
          />{' '}
          {bikeCompareState.includes(bike.bike_id) ? 'Remove' : 'Compare'}
        </button>
      </div>
    </div>
  ));

  if (!filteredBikes.length) {
    bikeOutput = (
      <Card title="Sorry!" icon="times" color="text-red-500">
        <p>No eBikes match your criteria. Try changing your filters.</p>
      </Card>
    );
  }

  return (
    <Layout title="Bikes">
      <section className={variables.sitePadding}>
        <h1 className="text-2xl font-black uppercase tracking-wider">eBikes</h1>
        <p>Filter and compare eBikes.</p>
        <div className="lg:flex">
          <div className="rounded-lg mt-3 px-3 py-2 bg-white border border-gray-300 lg:rounded-none lg:bg-transparent lg:border-0 lg:p-0 lg:w-1/5 lg:mr-4">
            <div
              className="flex items-center p-3 justify-between lg:p-0"
              onClick={handleFilterToggle}
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon="filter" className="mr-1" />
                <h4 className="font-black tracking-wider uppercase">
                  Filters:
                </h4>
              </div>
              <div className="block lg:hidden">
                {filtersShown ? (
                  <FontAwesomeIcon icon="chevron-up" className="mr-1" />
                ) : (
                  <FontAwesomeIcon icon="chevron-down" className="mr-1" />
                )}
              </div>
            </div>

            <section
              className={`pb-2 lg:mr-3 lg:pr-3 l lg:py-0 lg:w-full ${
                filtersShown ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="border-t border-gray-400 border-dashed pt-3 lg:pt-0 lg:border-0 lg:pt-0">
                <BikeFilters
                  filterSelections={bikeFiltersState}
                  setFilterSelections={setBikeFiltersState}
                  filtersShown={filtersShown}
                  setFiltersShown={setFiltersShown}
                  companiesState={companiesState}
                  setCompaniesState={setCompaniesState}
                />
              </div>

              <div className="flex items-center mt-4 border-t pt-4 border-gray-400 border-dashed">
                <FontAwesomeIcon icon="sort" className="w-4 h-4 mr-1" />
                <h4 className="font-black tracking-wider uppercase">Sort:</h4>
              </div>
              <BikeSorting
                sortSelections={bikeSortState}
                setSortSelections={setBikeSortState}
              />
            </section>
          </div>
          <section className="lg:w-4/5">
            {bikeCompareState.length > 1 ? (
              <div className="text-center mt-4 sticky top-24 z-20 bg-gradient-to-b from-gray-200 to-white rounded-b-xl py-2 px-4 shadow">
                <Link href="/bikes/compare" passHref>
                  <a
                    href="placeholder"
                    className="underline hover:no-underline"
                  >
                    <FontAwesomeIcon
                      icon="th-list"
                      className="mr-2 text-blue-500"
                    />
                    Compare {bikeCompareState.length} bikes
                  </a>
                </Link>
              </div>
            ) : null}
            <div className="flex flex-row flex-wrap -mx-2 my-2">
              {bikeOutput}
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

Bikes.propTypes = {};

export default Bikes;
