import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import BikeFilters from '../../components/BikeFilters';
import BikeSorting from '../../components/BikeSorting';
import Stat from '../../components/Stat';

// Styles
import { variables } from '../../styles/style-variables';

const bikeUrl = 'https://ebikecompanies.com/drupal/api/bikes';

export const getStaticProps = async () => {
  const response = await fetch(bikeUrl);
  const data = await response.json();

  return {
    props: { bikes: data },
  };
};

const Bikes = ({
  bikes,
  bikesState,
  setBikesState,
  companiesState,
  setCompaniesState,
  filterSelections,
  setFilterSelections,
  sortSelections,
  setSortSelections,
}) => {
  const [filtersShown, setFiltersShown] = useState(false);

  const handleFilterToggle = () => {
    setFiltersShown(!filtersShown);
  };

  useEffect(() => {
    if (bikes !== bikesState) {
      setBikesState(bikes);
    }
  }, [bikesState]);

  // Apply filters.
  let filteredBikes = bikes;

  // Price.
  if (filterSelections.price !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.price) <= Number(filterSelections.price)
    );
  }

  // Motor.
  if (filterSelections.motor !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.motor) >= Number(filterSelections.motor)
    );
  }

  // Battery.
  if (filterSelections.battery !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.battery) >= Number(filterSelections.battery)
    );
  }

  // Voltage.
  if (filterSelections.voltage !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.voltage) >= Number(filterSelections.voltage)
    );
  }

  // Range.
  if (filterSelections.range !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.range) >= Number(filterSelections.range)
    );
  }

  // Top Speed.
  if (filterSelections.top_speed !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) => Number(bike.top_speed) >= Number(filterSelections.top_speed)
    );
  }

  // Suspension.
  if (filterSelections.suspension !== '0') {
    filteredBikes = _.filter(
      filteredBikes,
      (bike) =>
        bike.suspension.toLowerCase() ===
        filterSelections.suspension.toLowerCase()
    );
  }

  // Apply sort.
  if (sortSelections.field) {
    filteredBikes = _.sortBy(filteredBikes, [
      (bike) => {
        const { field } = sortSelections;
        if (sortSelections.type === 'number') {
          return Number(bike[field]);
        }
        return bike[field];
      },
      'title',
    ]);

    if (sortSelections.direction !== 'asc') {
      filteredBikes.reverse();
    }
  }

  let bikeOutput = filteredBikes.map((bike) => (
    <div className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2" key={bike.bike_id}>
      <Link
        href={`/bikes/${bike.manufacturer
          .replace(/\s+/g, '-')
          .toLowerCase()}/${bike.title.replace(/\s+/g, '-').toLowerCase()}/${
          bike.bike_id
        }`}
        passHref
      >
        <a href="placeholder">
          <Card title={bike.title} image={bike.thumbnail} fit="responsive">
            <div className="-mt-3 mb-3 uppercase text-xs text-gray-500 tracking-wider font-thin">
              {bike.manufacturer}
            </div>
            <div className=" font-bold mb-3 border-t pt-3 text-xl text-green-500">
              {formatMoney(bike.price)}
            </div>
            <div className="flex flex-row flex-wrap">
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
    </div>
  ));

  if (!filteredBikes.length) {
    bikeOutput = (
      <Card title="Sorry!" icon="XIcon" color="text-red-500">
        <p>No eBikes match your criteria. Try changing your filters.</p>
      </Card>
    );
  }

  return (
    <Layout title="Bikes">
      <section className={variables.sitePadding}>
        <h1 className="text-2xl font-black uppercase tracking-wider">eBikes</h1>
        <p>This is the bikes page.</p>
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
                  filterSelections={filterSelections}
                  setFilterSelections={setFilterSelections}
                  filtersShown={filtersShown}
                  setFiltersShown={setFiltersShown}
                />
              </div>

              <div className="flex items-center mt-4 border-t pt-4 border-gray-400 border-dashed">
                <FontAwesomeIcon icon="sort" className="w-4 h-4 mr-1" />
                <h4 className="font-black tracking-wider uppercase">Sort:</h4>
              </div>
              <BikeSorting
                sortSelections={sortSelections}
                setSortSelections={setSortSelections}
              />
            </section>
          </div>
          <section className="flex flex-row flex-wrap -mx-2 my-2 lg:w-4/5">
            {bikeOutput}
          </section>
        </div>
      </section>
    </Layout>
  );
};

Bikes.propTypes = {};

export default Bikes;
