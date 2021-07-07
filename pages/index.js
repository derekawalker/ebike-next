import Link from 'next/link';
import Layout from '../components/Layout';
import Card from '../components/Card';

// Icons

// Styles
import { variables } from '../styles/style-variables';

const Home = () => (
  <Layout title="Home" type="home">
    <section className="bg-gradient-to-br from-gray-700 to-gray-800 p-12 md:p-16 text-white font-bold text-center ">
      <h2 className="text-3xl md:text-4xl mb-4">
        Looking for a fat tire eBike?
      </h2>
      <p className="font-normal">Compare thousands of bikes here!</p>
    </section>
    <section className={`${variables.sitePadding} md:flex md:flex-row  `}>
      <div className="w-full p-2">
        <Link href="/bikes">
          <a href="placeholder">
            <Card
              color="text-green-400"
              icon="motorcycle"
              title="Search & Compare"
              align="center"
              rounded
            >
              <p>Search, filters and compare the top scrambler style ebikes!</p>
            </Card>
          </a>
        </Link>
      </div>
    </section>
  </Layout>
);

export default Home;
