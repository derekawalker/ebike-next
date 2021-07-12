import { getAllReviewIds, getReviewData } from '../../lib/reviews';
import Layout from '../../components/Layout';
import Date from '../../components/Date';

// Styles
import { variables } from '../../styles/style-variables';
import styles from './styles.module.scss';

export default function Review({ reviewData }) {
  return (
    <Layout
      title={reviewData.title}
      description={`${reviewData.title} written ${reviewData.date}.`}
    >
      <article className={variables.sitePadding}>
        <h1 className="text-2xl font-bold mb-3">{reviewData.title}</h1>
        <div className="text-xs uppercase tracking-wider font-thin mb-3 text-gray-700">
          <Date dateString={reviewData.date} />
        </div>
        <div
          className={styles.container}
          dangerouslySetInnerHTML={{ __html: reviewData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllReviewIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const reviewData = await getReviewData(params.id);
  return {
    props: {
      reviewData,
    },
  };
}
