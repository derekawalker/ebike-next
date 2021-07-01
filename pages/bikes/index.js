import PropTypes from 'prop-types';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Card from '../../components/Card';

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

const Bikes = ({ bikes }) => (
  <Layout>
    <section className={variables.sitePadding}>
      <h1 className="text-2xl font-black uppercase tracking-wider">eBikes</h1>
      <p>This is the bikes page.</p>
      <section className="sm:flex sm:flex-row sm:flex-wrap sm:-mx-2 my-4">
        {bikes.map((bike) => (
          <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <Link href={`/bikes/${bike.manufacturer}/${bike.title}`} passHref>
              <a href="placeholder">
                <Card
                  key={bike.bike_id}
                  title={bike.title}
                  icon="CheckCircleIcon"
                  color="green-500"
                  image={bike.image}
                >
                  <div dangerouslySetInnerHTML={{ __html: bike.summary }} />
                </Card>
              </a>
            </Link>
          </div>
        ))}
      </section>
    </section>
  </Layout>
);

Bikes.propTypes = {
  bikes: PropTypes.arrayOf.isRequired,
};

export default Bikes;
