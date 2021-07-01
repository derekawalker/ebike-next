import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  DatabaseIcon,
  AdjustmentsIcon,
  ChatIcon,
} from '@heroicons/react/solid';
import { getSortedPostsData } from '../lib/posts';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Date from '../components/Date';

// Icons

// Styles
import { variables } from '../styles/style-variables';

const Home = ({ allPostsData }) => (
  <Layout>
    <section className="bg-gradient-to-br from-gray-700 to-gray-800 p-12 md:p-16 text-white font-bold text-center ">
      <h2 className="text-3xl md:text-4xl mb-4">
        Looking for a Scrambler eBike?
      </h2>
      <p className="font-normal">Compare thousands of bikes here!</p>
    </section>
    <section
      className={`${variables.sitePadding} md:flex md:flex-row md:-mx-2`}
    >
      <div className="md:w-1/3 p-2">
        <Card color="blue-500" icon="DatabaseIcon" title="Massive Database">
          <p>Search and compare thousands of bikes!</p>
        </Card>
      </div>
      <div className="md:w-1/3 p-2">
        <Card
          color="yellow-500"
          icon="AdjustmentsIcon"
          title="Comparison Tools"
        >
          <p>Search and compare thousands of bikes!</p>
        </Card>
      </div>
      <div className="md:w-1/3 p-2">
        <Card color="green-500" icon="ChatIcon" title="Helpful Insights">
          <p>Search and compare thousands of bikes!</p>
        </Card>
      </div>
    </section>
    <section className={variables.sitePadding}>
      <h2 className="text-2xl font-black uppercase tracking-wider">Blog</h2>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/posts/${id}`} passHref>
              <a href="placeholder">{title}</a>
            </Link>
            <br />
            <small>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

Home.propTypes = {
  allPostsData: PropTypes.arrayOf.isRequired,
};

export default Home;
