import { useState } from 'react';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import _ from 'lodash';
import Layout from '../../../components/Layout';
import Card from '../../../components/Card';
import BikeFilters from '../../../components/BikeFilters';

// Styles
import { variables } from '../../../styles/style-variables';

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
  const [bikeState, setBikeState] = useState(bikes);

  // Apply filters.
  let filteredBikes = bikeState;

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

  let bikeOutput = filteredBikes.map((bike) => (
    <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2" key={bike.bike_id}>
      <Link href={`/bikes/${bike.manufacturer}/${bike.title}`} passHref>
        <a href="placeholder">
          <Card
            title={bike.title}
            icon="CheckCircleIcon"
            color="green-500"
            image={bike.image}
          >
            <div>{formatMoney(bike.price)}</div>
            <div dangerouslySetInnerHTML={{ __html: bike.summary }} />
          </Card>
        </a>
      </Link>
    </div>
  ));

  if (!filteredBikes.length) {
    bikeOutput = (
      <Card title="Sorry!" icon="XIcon" color="red-500">
        <p>No eBikes match your criteria. Try changing your filters.</p>
      </Card>
    );
  }

  return (
    <Layout>
      <section className={variables.sitePadding}>
        <h1 className="text-2xl font-black uppercase tracking-wider">eBikes</h1>
        <p>This is the bikes page.</p>
        <section>
          <BikeFilters
            filterSelections={filterSelections}
            setFilterSelections={setFilterSelections}
          />
        </section>
        <section className="sm:flex sm:flex-row sm:flex-wrap sm:-mx-2 my-4">
          {bikeOutput}
        </section>
      </section>
    </Layout>
  );
};

Bikes.propTypes = {};

export default Bikes;
