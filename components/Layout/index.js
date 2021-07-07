import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from 'nextjs-breadcrumbs';
import siteinfo from '../../lib/siteinfo';

// Components
import Header from '../Header';

// Styles
import { variables } from '../../styles/style-variables';
import styles from './styles.module.scss';

const Layout = ({ title, description, type, children }) => (
  <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>
        {title} | {siteinfo.title}
      </title>
      <meta
        name="description"
        content={description || 'Search and compare eBikes.'}
      />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteinfo.title
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteinfo.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <body />
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
            : undefined
        } `}
      >
        <Breadcrumbs labelsToUppercase rootLabel="Home" />
      </div>
    </div>
    <main className="bg-gray-200 text-black">{children}</main>
    <footer className="bg-gray-900 text-base font-thin text-white text-center p-4">
      <p>Copyright eBikeScrambler.com. All Rights Reserved.</p>
    </footer>
  </div>
);

export default Layout;
