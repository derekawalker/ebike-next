import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import Layout from '../../components/Layout';
import Stat from '../../components/Stat';
import Card from '../../components/Card';
// Styles
import { variables } from '../../styles/style-variables';

const companyUrl = 'https://ebikecompanies.com/drupal/api/companies';
const bikesUrl = 'https://ebikecompanies.com/drupal/api/bikes';

// export const getStaticProps = async ({ params }) => {
//   const response = await fetch(companyUrl);
//   const data = await response.json();

//   return {
//     props: {
//       companies: data,
//       params,
//     },
//   };
// };

export const getStaticProps = async ({ params }) => {
  const companyRes = await fetch(companyUrl);
  const companyData = await companyRes.json();

  const bikeRes = await fetch(bikesUrl);
  const bikeData = await bikeRes.json();

  return {
    props: {
      companies: companyData,
      bikes: bikeData,
      params,
    },
    revalidate: 1,
  };
};

const Company = ({ companies, bikes, params }) => {
  const company = _.filter(
    companies,
    (item) =>
      item.title.replace(/\s+/g, '-').toLowerCase() ===
      params.slug[0].replace(/\s+/g, '-').toLowerCase()
  );
  const companyBikes = _.filter(
    bikes,
    (item) =>
      item.manufacturer.replace(/\s+/g, '-').toLowerCase() ===
      params.slug[0].replace(/\s+/g, '-').toLowerCase()
  );
  const thisCompany = company[0];

  const bikeOutput = companyBikes.map((bike) => (
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
          <Card title={bike.title} image={bike.image}>
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

  return (
    <Layout title={`${thisCompany.title}`} type="company">
      <article className="">
        <div className="">
          <div className="border-b ">
            <Image
              src={thisCompany.image}
              alt={thisCompany.title}
              layout="responsive"
              width={3000}
              height={2000}
            />
          </div>
        </div>

        <div className={`${variables.sitePadding} `}>
          <h1 className="text-2xl font-bold ">{thisCompany.title}</h1>
          {thisCompany.link && (
            <div className="font-bold mb-3 ">
              <a
                href={thisCompany.link}
                className="border rounded-3xl border-blue-500 text-blue-500 uppercase tracking-wider px-4 py-2 block text-center bg-blue-100"
              >
                Visit Website
              </a>
            </div>
          )}
          <div
            className="mb-3 border-t border-gray-300 pt-3"
            dangerouslySetInnerHTML={{ __html: thisCompany.body }}
          />
          <section className="flex flex-row flex-wrap -mx-2 my-2">
            {bikeOutput}
          </section>
        </div>
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(companyUrl);
  const companies = await res.json();

  const paths = companies.map((company) => ({
    params: {
      slug: [`${company.title.replace(/\s+/g, '-').toLowerCase()}`],
    },
  }));

  return { paths, fallback: false };
}

export default Company;