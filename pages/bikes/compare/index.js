import Link from 'next/link';
import { formatMoney } from 'accounting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../../../components/Layout';
import Card from '../../../components/Card';
import Date from '../../../components/Date';
import Stat from '../../../components/Stat';
import styles from './styles.module.scss';

// Icons

// Styles
import { variables } from '../../../styles/style-variables';

const CompareEbikes = ({
  bikesState,
  setBikesState,
  companiesState,
  setCompaniesState,
  filterSelections,
  setFilterSelections,
  sortSelections,
  setSortSelections,
  compareList,
  setCompareList,
}) => {
  const bikesToCompare = bikesState.filter((bike) =>
    compareList.includes(bike.bike_id)
  );

  const handleCompareClick = (id) => {
    console.log(compareList);
    if (compareList.includes(id)) {
      const newList = compareList.filter((item) => item !== id);
      setCompareList(newList);
    } else {
      setCompareList([...compareList, id]);
    }
  };

  const bikeOutput = bikesToCompare.map((bike) => (
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
            <div className={`pb-9 w-full ${styles.statWrapper}`}>
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
      <div className="absolute z-10 bottom-2 left-2 right-2 text-sm opacity-75 hover:opacity-100 focus:opacity-100">
        <button
          onClick={() => handleCompareClick(bike.bike_id)}
          type="button"
          className={`px-2 py-1 block w-full rounded-lg  text-left uppercase tracking-wider text-white ${
            compareList.includes(bike.bike_id)
              ? 'bg-red-400 hover:bg-red-500'
              : 'bg-blue-400 hover:bg-blue-500'
          }`}
        >
          <FontAwesomeIcon
            icon={
              compareList.includes(bike.bike_id)
                ? 'times-circle'
                : 'plus-circle'
            }
            className=""
          />{' '}
          {compareList.includes(bike.bike_id) ? 'Remove' : 'Compare'}
        </button>
      </div>
    </div>
  ));
  return (
    <Layout title="Compare eBikes">
      <section className={`${variables.sitePadding} ${styles.bikeContainer}`}>
        <div className="flex flex-row  overflow-x-auto shadow-inner shadow-xl p-2 bg-gray-300 rounded-xl">
          {bikeOutput}
        </div>
      </section>
    </Layout>
  );
};

export default CompareEbikes;
