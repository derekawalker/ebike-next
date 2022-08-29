import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import Card from '../components/Card';

// Styles
import { variables } from '../styles/style-variables';

const Home = () => (
  <Layout title="Search and Compare eBikes" type="home">
    <Head>
      <script
        type="text/javascript"
        src="https://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=9806922b722d94e7ecd901121fab716635795553"
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
        <h2 className="text-3xl md:text-4xl mb-4 w-full ">Compare eBikes</h2>
        <p className="font-normal w-full ">
          Search and compare hundreds of electric bikes here!
        </p>
      </div>
    </section>
    <section className={`${variables.sitePadding} md:flex md:flex-row  `}>
      <div className="w-full p-2">
        <Link href="/bikes" passHref>
          <a href="placeholder">
            <Card
              color="text-yellow-400 bg-gray-800"
              icon="search"
              iconSize="lg"
              title="Search & Compare"
              align="center"
              rounded
            >
              <p>Search, filter and compare the top scrambler style eBikes!</p>
            </Card>
          </a>
        </Link>
      </div>
      <div className="w-full p-2">
        <Link href="/reviews" passHref>
          <a href="placeholder">
            <Card
              color="text-green-400 bg-gray-800"
              icon="comment-dots"
              iconSize="lg"
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
        <Link href="/products" passHref>
          <a href="placeholder">
            <Card
              color="text-blue-400 bg-gray-800"
              icon="motorcycle"
              iconSize="lg"
              title="eBike Accessories"
              align="center"
              rounded
            >
              <p>
                View a list of eBike accessories for 20&quot;x4&quot; ebikes.
              </p>
            </Card>
          </a>
        </Link>
      </div>
    </section>
    <section className={`${variables.sitePadding} text-center`}>
      <h1 className="text-xl font-bold">eBike Companies</h1>
      <p className="mb-3">
        Searching for the perfect eBike can be a daunting task. eBikeCompanaies
        makes it easy to compare hundreds of{' '}
        <Link href="/bikes" passHref>
          <a className="underline" href="placeholder">
            electric bikes
          </a>
        </Link>
        , and can help you find exactly what your are looking for.
      </p>
      <p className="mb-3">
        Our bike comparison tools can help you discover which bikes fit your
        needs, and which will give you the best bang for your buck.
      </p>
      <p className="mb-3">
        <strong>Note:</strong> We specialize in bikes with 20&quot;x4&quot;
        tires, but we may add other electric bike categories in the future.
      </p>
    </section>
  </Layout>
);

export default Home;
