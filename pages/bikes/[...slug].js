import _ from 'lodash';
import Image from 'next/image';
import Layout from '../../components/Layout';

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
  console.log(bike);
  return (
    <Layout>
      <article>
        <div className="relative h-96">
          <Image
            src={thisBike.image}
            alt={thisBike.title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className={variables.sitePadding}>
          <h1 className="text-2xl font-bold mb-3">{thisBike.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: thisBike.body }} />
        </div>
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
