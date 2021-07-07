import Link from 'next/link';
import { getSortedReviewsData } from '../../lib/reviews';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Date from '../../components/Date';

// Icons

// Styles
import { variables } from '../../styles/style-variables';

const Reviews = ({ allReviewsData }) => (
  <Layout title="eBike Reviews">
    <section className={variables.sitePadding}>
      <h1 className="text-2xl font-black uppercase tracking-wider">
        eBike Reviews
      </h1>
      <p>Lateste reviews for fat tire electric bikes.</p>
    </section>
    <section className={variables.sitePadding}>
      <ul>
        {allReviewsData.map(({ id, date, title }) => (
          <li key={id} className="my-5">
            <Link href={`/reviews/${id}`} passHref>
              <a
                href="placeholder"
                className="font-bold text-2xl text-blue-500 hover:text-blue-400"
              >
                {title}
              </a>
            </Link>
            <br />
            <small>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
    ;
  </Layout>
);

export async function getStaticProps() {
  const allReviewsData = getSortedReviewsData();
  return {
    props: {
      allReviewsData,
    },
  };
}

export default Reviews;
