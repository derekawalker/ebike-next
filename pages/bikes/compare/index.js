import Link from 'next/link';
import { formatMoney } from 'accounting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import Layout from '../../../components/Layout';
import Card from '../../../components/Card';
import Stat from '../../../components/Stat';
import styles from './styles.module.scss';
import * as gtag from '../../../lib/gtag';

import { useBikeContext } from '../../../contexts/bikes';
import { useBikeCompareContext } from '../../../contexts/bike-compare';

// Styles
import { variables } from '../../../styles/style-variables';

const CompareEbikes = () => {
  const [bikesState] = useBikeContext();
  const [bikeCompareState, setBikeCompareState] = useBikeCompareContext();

  const bikesToCompare = bikesState.filter((bike) =>
    bikeCompareState.includes(bike.bike_id)
  );

  useEffect(() => {
    gtag.event({
      action: 'compare_page_viewed',
      category: 'compare',
      label: 'Bikes Compared',
      value: 1,
    });
  }, []);

  const handleCompareClick = (id) => {
    console.log(bikeCompareState);
    if (bikeCompareState.includes(id)) {
      const newList = bikeCompareState.filter((item) => item !== id);
      setBikeCompareState(newList);
    } else {
      setBikeCompareState([...bikeCompareState, id]);
    }
  };

  let bikeOutput = (
    <div className="w-full my-8">
      <Card
        title="Sorry!"
        icon="times"
        color="text-red-500 bg-gray-700"
        align="center"
      >
        <p>
          You have not selected any bikes to compare. Visit the{' '}
          <Link href="/bikes" passHref>
            <a href="placeholder" className="underline text-blue-500">
              Bikes
            </a>
          </Link>{' '}
          pages and makes some selections.
        </p>
      </Card>
    </div>
  );

  if (bikesToCompare.length) {
    bikeOutput = bikesToCompare.map((bike) => (
      <div className={`relative ${styles.bikeWrapper}`} key={bike.bike_id}>
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
              align="left"
            >
              <div className="-mt-3 mb-1 uppercase text-xs text-gray-500 tracking-wider font-thin">
                {bike.manufacturer}
              </div>
              <div className=" font-bold mb-3 border-t pt-1 text-lg text-green-500">
                {formatMoney(bike.price)}
              </div>
              <div className={`pb-9 md:pb-10 w-full ${styles.statWrapper}`}>
                <Stat title="Motor">{bike.motor || '---'} W</Stat>
                <Stat title="Battery">{bike.battery || '---'} Ah</Stat>
                <Stat title="Volts">{bike.voltage || '---'} V</Stat>
                <Stat title="Top Speed">{bike.top_speed || '---'} mph</Stat>
                <Stat title="Range">{bike.range || '---'} miles</Stat>
                <Stat title="Suspension">{bike.suspension || '---'}</Stat>
                <Stat title="Front Tire">{bike.front_tire || '---'}</Stat>
                <Stat title="Rear Tire">{bike.rear_tire || '---'}</Stat>
                <Stat title="Headlight">{bike.headlight || '---'}</Stat>
                <Stat title="Brake Light">{bike.brake_light || '---'}</Stat>
                <Stat title="Gears">{bike.gears || '---'}-Speed</Stat>
                <Stat title="Motor Type">{bike.motor_type || '---'}</Stat>
                <Stat title="Payload">{bike.payload || '---'} lbs</Stat>
                <Stat title="Riders">{bike.riders || '---'}</Stat>
              </div>
            </Card>
          </a>
        </Link>
        <div className=" z-50 -mt-10 mx-2 text-sm opacity-75 hover:opacity-100 focus:opacity-100 sticky bottom-2">
          <button
            onClick={() => handleCompareClick(bike.bike_id)}
            type="button"
            className={`px-4 py-2 block w-full flex items-center rounded-lg text-left uppercase tracking-wider text-white ${
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
              className="w-4 mr-1"
            />{' '}
            {bikeCompareState.includes(bike.bike_id) ? 'Remove' : 'Compare'}
          </button>
        </div>
      </div>
    ));
  }

  return (
    <Layout
      title="Compare eBikes"
      description="Side-by-side comparison tool for eBikes (electric bikes)."
    >
      <section className={`${variables.sitePadding} ${styles.bikeContainer} `}>
        <div className="flex flex-row overflow-x-auto h-vh70 ">
          {bikeOutput}
        </div>
      </section>
    </Layout>
  );
};

export default CompareEbikes;
