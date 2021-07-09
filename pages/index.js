import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import Card from '../components/Card';

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
    <section className="relative bg-gray-800 h-vh40">
      <div className="h-vh40 overflow-hidden absolute top-0 left-0 right-0 z-10">
        <Image
          alt="eBike riders at sunset"
          src="/images/bikes_sunset.jpg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="h-vh40 w-full flex items-center content-center flex-row flex-wrap px-6 text-white font-bold text-center absolute top-0 left-0 right-0 z-20 bg-gray-800 bg-opacity-75">
        <h2 className="text-3xl md:text-4xl mb-4 w-full ">
          Search and compare eBikes
        </h2>
        <p className="font-normal w-full ">
          Compare hundreds of electric bikes here!
        </p>
      </div>
    </section>
    <section className={`${variables.sitePadding} md:flex md:flex-row  `}>
      <div className="w-full p-2">
        <Link href="/bikes">
          <a href="placeholder">
            <Card
              color="text-yellow-400"
              icon="search"
              title="Search & Compare"
              align="center"
              rounded
            >
              <p>Search, filters and compare the top scrambler style eBikes!</p>
            </Card>
          </a>
        </Link>
      </div>
      <div className="w-full p-2">
        <Link href="/reviews">
          <a href="placeholder">
            <Card
              color="text-green-400"
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
              color="text-blue-400"
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
