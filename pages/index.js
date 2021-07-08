import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import Card from '../components/Card';

// Icons

// Styles
import { variables } from '../styles/style-variables';

const Home = () => (
  <Layout title="Home" type="home">
    <Head>
      <script
        type="text/javascript"
        src="http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=9806922b722d94e7ecd901121fab716635795553"
      />
    </Head>
    <section className="bg-gradient-to-br from-blue-500 to-blue-700 p-12 md:p-16 text-white font-bold text-center ">
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
              icon="search"
              title="Search & Compare"
              align="center"
              rounded
            >
              <p>Search, filters and compare the top scrambler style ebikes!</p>
            </Card>
          </a>
        </Link>
      </div>
      <div className="w-full p-2">
        <Link href="/reviews">
          <a href="placeholder">
            <Card
              color="text-blue-400"
              icon="comment-dots"
              title="eBike Reviews"
              align="center"
              rounded
            >
              <p>Read comparisons and reviews.</p>
            </Card>
          </a>
        </Link>
      </div>
      <div className="w-full p-2">
        <Link href="/companies">
          <a href="placeholder">
            <Card
              color="text-yellow-400"
              icon="motorcycle"
              title="eBike Companies"
              align="center"
              rounded
            >
              <p>
                View a list of eBike companies making scrambler style ebikes.
              </p>
            </Card>
          </a>
        </Link>
      </div>
    </section>
  </Layout>
);

export default Home;
