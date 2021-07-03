import PropTypes from 'prop-types';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Date from '../components/Date';

// Icons

// Styles
import { variables } from '../styles/style-variables';

const Home = ({ allPostsData }) => (
  <Layout title="Home" type="home">
    <section className="bg-gradient-to-br from-gray-700 to-gray-800 p-12 md:p-16 text-white font-bold text-center ">
      <h2 className="text-3xl md:text-4xl mb-4">
        Looking for a Scrambler eBike?
      </h2>
      <p className="font-normal">Compare thousands of bikes here!</p>
    </section>
    <section className={`${variables.sitePadding} md:flex md:flex-row  `}>
      <div className="md:w-1/3 p-2">
        <Card color="text-blue-500" icon="motorcycle" title="Massive Database">
          <p>Search and compare thousands of bikes!</p>
        </Card>
      </div>
      <div className="md:w-1/3 p-2">
        <Card color="text-yellow-500" icon="sliders-h" title="Comparison Tools">
          <p>Search and compare thousands of bikes!</p>
        </Card>
      </div>
      <div className="md:w-1/3 p-2">
        <Card
          color="text-green-500"
          icon="comment-dots"
          title="Helpful Insights"
        >
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
