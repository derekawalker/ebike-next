import Head from 'next/head';
import Link from 'next/link';
import siteinfo from '../../lib/siteinfo';

// Components
import Header from '../Header';

// Styles
import { variables } from '../../styles/style-variables';

const Layout = ({ children }) => (
  <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Learn how to build a personal website using Next.js"
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
    <main className="bg-gray-200 text-black">{children}</main>
    <footer
      className={`${variables.sitePadding} bg-gray-800 text-base font-thin text-white text-center px`}
    >
      <p>Copyright eBikeScrambler.com. All Rights Reserved.</p>
    </footer>
  </div>
);

export default Layout;
