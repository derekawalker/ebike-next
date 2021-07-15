import Head from 'next/head';
import Breadcrumbs from 'nextjs-breadcrumbs';
import { useRouter } from 'next/router';
import siteinfo from '../../lib/siteinfo';

// Components
import Header from '../Header';

// Styles
import { variables } from '../../styles/style-variables';
import styles from './styles.module.scss';

const Layout = ({ title, description, type, image, children }) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>
          {title} | {siteinfo.title}
        </title>
        <meta
          name="description"
          content={description || siteinfo.description}
        />
        <meta
          property="og:title"
          content={title || siteinfo.title}
          key="ogtitle"
        />
        <meta property="og:type" content="article" key="ogtype" />
        <meta
          property="og:image"
          content={image || `${siteinfo.base_url}/images/bikes_sunset.jpg`}
          key="ogimage"
        />
        <meta
          property="og:url"
          content={siteinfo.base_url + router.pathname}
          key="ogurl"
        />
        <meta
          property="og:description"
          content={description || siteinfo.description}
          key="ogdescription"
        />
      </Head>
      <Header />
      <div className="bg-gray-900 relative sticky top-16 z-40">
        <div
          className={`${variables.sitePaddingX} ${
            styles.breadcrumbs
          } bg-gray-900 text-gray-400 ${
            type === 'bike'
              ? styles.bike
              : type === 'home'
              ? styles.home
              : type === 'review'
              ? styles.review
              : type === 'product'
              ? styles.product
              : undefined
          } `}
        >
          <Breadcrumbs labelsToUppercase rootLabel="Home" />
        </div>
      </div>
      <main className="bg-gray-200 text-black">{children}</main>
      <footer className="bg-gray-900 text-base font-thin text-white text-center p-4">
        <p>Copyright eBikeCompanies.com. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
