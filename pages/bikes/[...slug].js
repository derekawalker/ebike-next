import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import Layout from '../../components/Layout';
import Stat from '../../components/Stat';
import Icon from '../../components/Icon';

// Styles
import { variables } from '../../styles/style-variables';

const bikeUrl = 'https://ebikecompanies.com/drupal/api/bikes';

export const getStaticProps = async ({ params }) => {
  const response = await fetch(bikeUrl);
  const data = await response.json();

  return {
    props: {
      bikes: data,
      params,
    },
  };
};

const Bike = ({ bikes, params }) => {
  const bike = _.filter(bikes, (item) => item.bike_id === params.slug[2]);
  const thisBike = bike[0];

  const supportingData = (
    <div
      className={`${variables.sitePadding} flex flex-wrap flex-row bg-white`}
    >
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat title="Front Tire" icon="XCircleIcon" color="text-gray-800">
          {thisBike.front_tire}
        </Stat>
      </div>

      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat title="Range">{bike.range} miles</Stat>
      </div>

      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat title="Rear Tire" icon="XCircleIcon" color="text-gray-800">
          {thisBike.rear_tire}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat
          title="Headlight"
          icon="DotsCircleHorizontalIcon"
          color="text-yellow-400"
        >
          {thisBike.headlight}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat
          title="Brake Light"
          icon="DotsCircleHorizontalIcon"
          color="text-red-400"
        >
          {thisBike.brake_light}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat
          title="Gears"
          icon="DotsCircleHorizontalIcon"
          color="text-red-400"
        >
          {thisBike.gears}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat
          title="Motor Type"
          icon="DotsCircleHorizontalIcon"
          color="text-red-400"
        >
          {thisBike.motor_type}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat
          title="Payload"
          icon="DotsCircleHorizontalIcon"
          color="text-red-400"
        >
          {thisBike.payload}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat
          title="Riders"
          icon="DotsCircleHorizontalIcon"
          color="text-red-400"
        >
          {thisBike.riders}
        </Stat>
      </div>
    </div>
  );

  return (
    <Layout title={`${thisBike.manufacturer} - ${thisBike.title}`} type="bike">
      <article className="sm:flex sm:flex-row sm:flex-wrap ">
        <div className={` sm:w-1/2 md:w-3/5 bg-white `}>
          <div className="border-b ">
            <Image
              src={thisBike.image}
              alt={thisBike.title}
              layout="responsive"
              width={3000}
              height={2000}
            />
          </div>

          <div className="hidden sm:block">{supportingData}</div>
        </div>

        <div className={`${variables.sitePadding} sm:w-1/2 md:w-2/5`}>
          <h1 className="text-2xl font-bold ">{thisBike.title}</h1>
          <h2 className="mb-2 text-gray-500 uppercase tracking-wider text-xs">
            {thisBike.manufacturer}
          </h2>
          <div className="font-bold mb-3 text-xl">
            {formatMoney(thisBike.price)}
          </div>
          <div className="flex flex-wrap">
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat title="Motor" icon="CogIcon" color="text-green-500">
                {thisBike.motor} W
              </Stat>
            </div>
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat
                title="Battery"
                icon="LightningBoltIcon"
                color="text-yellow-500"
              >
                {thisBike.battery} Ah
              </Stat>
            </div>
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat title="Volts" icon="LightningBoltIcon" color="text-red-500">
                {thisBike.voltage} V
              </Stat>
            </div>
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat title="Range" icon="ArrowRightIcon" color="text-blue-500">
                {thisBike.voltage} miles
              </Stat>
            </div>
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat
                title="Top Speed"
                icon="LightningBoltIcon"
                color="text-purple-500"
              >
                {thisBike.top_speed} mph
              </Stat>
            </div>
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat
                title="Suspension"
                icon="ChartBarIcon"
                color="text-gray-500"
              >
                {thisBike.suspension}
              </Stat>
            </div>

            <div
              className="mb-3 border-t border-gray-300 pt-3"
              dangerouslySetInnerHTML={{ __html: thisBike.body }}
            />
          </div>
        </div>

        <div className="block sm:hidden">{supportingData}</div>
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(bikeUrl);
  const bikes = await res.json();

  const paths = bikes.map((bike) => ({
    params: {
      slug: [
        `${bike.manufacturer.replace(/\s+/g, '-').toLowerCase()}`,
        `${bike.title.replace(/\s+/g, '-').toLowerCase()}`,
        bike.bike_id,
      ],
    },
  }));

  return { paths, fallback: false };
}

export default Bike;
