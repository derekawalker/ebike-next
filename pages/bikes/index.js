import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import _ from 'lodash';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import BikeFilters from '../../components/BikeFilters';
import BikeSorting from '../../components/BikeSorting';
import Icon from '../../components/Icon';
import { BikeContext } from '../../contexts/BikeContext';

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

const Bikes = ({ bikes }) => {
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
  const [bikeState, setBikeState] = useContext(BikeContext);

  useEffect(() => {
    if (bikes) {
      setBikeState({ bikes });
    }
  }, [bikeState.bikes]);

  // Apply filters.
  let filteredBikes = bikeState.bikes;

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
    <div className="w-1/2 md:w-1/3 xl:w-1/4 p-2" key={bike.bike_id}>
      <Link
        href={`/bikes/${bike.manufacturer
          .replace(/\s+/g, '-')
          .toLowerCase()}/${bike.title.replace(/\s+/g, '-').toLowerCase()}/${
          bike.bike_id
        }`}
        passHref
      >
        <a href="placeholder">
          <Card title={bike.title} color="green-500" image={bike.image}>
            <div className="-mt-3 mb-3 uppercase text-xs text-gray-500 tracking-wider font-thin">
              {bike.manufacturer}
            </div>
            <div className="border rounded-3xl bg-white border-green-500 text-green-500 font-bold px-4 py-2 mb-3 text-lg">
              {formatMoney(bike.price)}
            </div>
            <div className="">{bike.motor}W</div>
            <div className="">{bike.battery}Ah</div>
            <div className="">{bike.voltage}V</div>
            <div className="">Range: {bike.range} miles</div>
            <div className="">{bike.top_speed} mph</div>
            <div className="">Suspension: {bike.suspension}</div>
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
          <section className=" border-b border-gray-400 pb-2 mt-3 lg:w-1/5 lg:mr-5 lg:pr-5 lg:border-r lg:border-b-0 lg:py-0">
            <div className="flex items-center">
              <Icon icon="FilterIcon" className="w-4 h-4 mr-1" />
              <h4 className="font-black tracking-wider uppercase">Filters:</h4>
            </div>
            <BikeFilters
              filterSelections={filterSelections}
              setFilterSelections={setFilterSelections}
            />

            <div className="flex items-center mt-4 border-t pt-4 border-gray-400 border-dashed">
              <Icon icon="SortAscendingIcon" className="w-4 h-4 mr-1" />
              <h4 className="font-black tracking-wider uppercase">Sort:</h4>
            </div>
            <BikeSorting
              sortSelections={sortSelections}
              setSortSelections={setSortSelections}
            />
          </section>
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
