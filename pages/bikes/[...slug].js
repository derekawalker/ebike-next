import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../../components/Layout';
import Stat from '../../components/Stat';
import selectOptions from '../../components/BikeFilters/selectOptions';
import ProgressBar from '../../components/ProgressBar';

// Styles
import { variables } from '../../styles/style-variables';

const bikeUrl = 'https://data.ebikecompanies.com/api/bikes';

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

const Bike = ({
  bikes,
  params,
  bikesState,
  setBikesState,
  companiesState,
  setCompaniesState,
}) => {
  const bike = _.filter(bikes, (item) => item.bike_id === params.slug[2]);
  const thisBike = bike[0];

  let priceTier = 0;
  for (let index = 0; index < selectOptions.price.length; index++) {
    if (thisBike.price >= selectOptions.price[index].value) {
      priceTier++;
    }
  }

  const bikeArray = [];
  bikes.map((bike) => {
    let bikePriceTier = 0;
    for (let index = 0; index < selectOptions.price.length; index++) {
      if (bike.price >= selectOptions.price[index].value) {
        bikePriceTier++;
      }
    }

    if (bikePriceTier === priceTier) {
      bikeArray.push(bike);
    }
  });

  const motorHigh = Math.max(...bikeArray.map((o) => Number(o.motor)));
  const motorLow = Math.min(...bikeArray.map((o) => Number(o.motor)));
  const motorAvg =
    bikeArray.reduce((total, next) => total + Number(next.motor), 0) /
    bikeArray.length;

  const topSpeedHigh = Math.max(...bikeArray.map((o) => Number(o.top_speed)));
  const topSpeedLow = Math.min(...bikeArray.map((o) => Number(o.top_speed)));
  const topSpeedAvg =
    bikeArray.reduce((total, next) => total + Number(next.top_speed), 0) /
    bikeArray.length;

  const batteryHigh = Math.max(...bikeArray.map((o) => Number(o.battery)));
  const batteryLow = Math.min(...bikeArray.map((o) => Number(o.battery)));
  const batteryAvg =
    bikeArray.reduce((total, next) => total + Number(next.battery), 0) /
    bikeArray.length;

  const rangeHigh = Math.max(...bikeArray.map((o) => Number(o.range)));
  const rangeLow = Math.min(...bikeArray.map((o) => Number(o.range)));
  const rangeAvg =
    bikeArray.reduce((total, next) => total + Number(next.range), 0) /
    bikeArray.length;

  const priceHigh = Math.max(...bikeArray.map((o) => Number(o.price)));
  const priceLow = Math.min(...bikeArray.map((o) => Number(o.price)));
  const priceAvg =
    bikeArray.reduce((total, next) => total + Number(next.price), 0) /
    bikeArray.length;

  const supportingData = (
    <div
      className={`${variables.sitePadding} flex flex-wrap flex-row bg-white`}
    >
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat title="Front Tire" icon="record-vinyl" color="text-gray-800">
          {thisBike.front_tire}
        </Stat>
      </div>

      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat title="Rear Tire" icon="record-vinyl" color="text-gray-800">
          {thisBike.rear_tire}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat title="Headlight" icon="lightbulb" color="text-yellow-500">
          {thisBike.headlight}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat title="Brake Light" icon="lightbulb" color="text-red-500">
          {thisBike.brake_light}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat title="Gears" icon="cogs" color="text-gray-500">
          {thisBike.gears}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat title="Motor Type" icon="cog" color="text-gray-500">
          {thisBike.motor_type}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat title="Payload" icon="weight" color="text-blue-500">
          {thisBike.payload}
        </Stat>
      </div>
      <div className="w-1/2 sm:w-full md:w-1/2">
        <Stat title="Riders" icon="user-friends" color="text-yellow-500">
          {thisBike.riders}
        </Stat>
      </div>
      <div
        className="mb-3 border-t border-gray-300 pt-3"
        dangerouslySetInnerHTML={{ __html: thisBike.body }}
      />
    </div>
  );

  return (
    <Layout
      title={`${thisBike.manufacturer}: ${thisBike.title} eBike`}
      type="bike"
      description={`Specs and pricing for ${thisBike.title} by ${thisBike.manufacturer}.`}
      image={thisBike.image}
    >
      <article className="sm:flex sm:flex-row sm:flex-wrap ">
        <div className={` sm:w-1/2 md:w-3/5 bg-white `}>
          <div className="border-b ">
            <Image
              src={thisBike.image}
              alt={thisBike.title}
              width={4000}
              height={3000}
              objectFit="responsive"
            />
          </div>

          <div className="hidden sm:block">{supportingData}</div>
        </div>

        <div className={`${variables.sitePadding} sm:w-1/2 md:w-2/5`}>
          <h1 className="text-2xl font-bold ">{thisBike.title}</h1>
          <h2 className="mb-2 text-gray-500 uppercase tracking-wider text-xs">
            <Link
              href={`/companies/${thisBike.manufacturer
                .replace(/\s+/g, '-')
                .toLowerCase()}`}
              passHref
            >
              <a href="placeholder">{thisBike.manufacturer}</a>
            </Link>
          </h2>
          <div className="font-bold text-xl border-b border-gray-300 pb-3">
            {formatMoney(thisBike.price)}
          </div>
          {thisBike.link && (
            <div className="font-bold mb-3 ">
              <a
                target="_blank"
                href={thisBike.link}
                className="border rounded-3xl border-blue-500 text-blue-500 uppercase tracking-wider px-4 py-2 block text-center bg-blue-100"
                rel="noreferrer"
              >
                Visit Website
              </a>
            </div>
          )}
          <div className="flex flex-wrap">
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat title="Motor" icon="cog" color="text-red-500">
                {thisBike.motor} W
              </Stat>
            </div>
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat title="Battery" icon="battery-full" color="text-green-500">
                {thisBike.battery} Ah
              </Stat>
            </div>
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat title="Volts" icon="bolt" color="text-yellow-500">
                {thisBike.voltage} V
              </Stat>
            </div>
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat
                title="Range"
                icon="road"
                color="text-gray-700"
                tooltip="max pedal-assisted range"
              >
                {thisBike.voltage} miles
              </Stat>
            </div>
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat
                title="Top Speed"
                icon="tachometer-alt"
                color="text-blue-500"
              >
                {thisBike.top_speed} mph
              </Stat>
            </div>
            <div className="w-1/2 sm:w-full lg:w-1/2">
              <Stat title="Suspension" icon="coins" color="text-yellow-600">
                {thisBike.suspension}
              </Stat>
            </div>
            <div className="border border-gray-300 w-full mt-4 rounded bg-gray-700">
              <h4 className="font-bold uppercase text-xs tracking-wider border-b bg-gray-800 text-white border-gray-700 w-full rounded-t px-4 py-2">
                How this bike compares with others in its price range:
              </h4>
              <div className="pt-2 px-4 pb-2">
                <ProgressBar
                  title="Motor"
                  high={motorHigh}
                  low={motorLow}
                  value={thisBike.motor}
                  avg={motorAvg}
                  suffix=" W"
                  className="mb-2 text-white bg-transparent"
                />

                <ProgressBar
                  title="Top Speed"
                  high={topSpeedHigh}
                  low={topSpeedLow}
                  value={thisBike.top_speed}
                  avg={topSpeedAvg}
                  suffix=" mph"
                  className="mb-2 text-white bg-transparent"
                />

                <ProgressBar
                  title="Battery"
                  high={batteryHigh}
                  low={batteryLow}
                  value={thisBike.battery}
                  avg={batteryAvg}
                  suffix=" Ah"
                  className="mb-2 text-white bg-transparent"
                />

                <ProgressBar
                  title="Range"
                  high={rangeHigh}
                  low={rangeLow}
                  value={thisBike.range}
                  avg={rangeAvg}
                  suffix=" miles"
                  className="mb-2 text-white bg-transparent"
                />

                <ProgressBar
                  title="Price"
                  high={priceHigh}
                  low={priceLow}
                  value={thisBike.price}
                  avg={priceAvg}
                  prefix="$"
                  reverse
                  className="mb-2 text-white bg-transparent"
                />
              </div>
            </div>
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
