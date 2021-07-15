import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import styles from './styles.module.scss';
import Layout from '../../components/Layout';
import Stat from '../../components/Stat';
import Card from '../../components/Card';

// Styles
import { variables } from '../../styles/style-variables';

const reviewUrl = 'https://data.ebikecompanies.com/api/reviews';

export const getStaticProps = async ({ params }) => {
  const reviewRes = await fetch(reviewUrl);
  const reviewData = await reviewRes.json();

  return {
    props: {
      reviews: reviewData,
      params,
    },
    revalidate: 1,
  };
};

const Review = ({ reviews, params }) => {
  console.log(params);

  const thisSlug = params.slug[0];
  console.log(thisSlug);
  const review = _.filter(
    reviews,
    (item) => item.path.substring(1) === thisSlug
  );

  const thisReview = review[0];

  return (
    <Layout
      title={`${thisReview.title}`}
      type="review"
      description={`A list of eBikes made by ${thisReview.title}, an electric review review.`}
      image={thisReview.image}
    >
      <article className="">
        <div className="">
          <div className="border-b">
            <div className={`w-full  border-b bg-${thisReview.background}`}>
              <div className="relative h-64 bg-white">
                <Image
                  src={thisReview.image}
                  alt={thisReview.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${variables.reviewPadding} `}>
          <h1 className="text-2xl font-bold ">{thisReview.title}</h1>
          {thisReview.link && (
            <div className="font-bold mb-3 ">
              <a
                target="_blank"
                href={thisReview.link}
                className="border rounded-3xl border-blue-500 text-blue-500 uppercase tracking-wider px-4 py-2 block text-center bg-blue-100"
                rel="noreferrer"
              >
                Visit Website
              </a>
            </div>
          )}
          <div
            className={`${styles.reviewWrapper} mb-3  pt-3`}
            dangerouslySetInnerHTML={{ __html: thisReview.body }}
          />
        </div>
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(reviewUrl);
  const reviews = await res.json();

  const paths = reviews.map((review) => {
    const path = review.path.substring(1);

    return {
      params: {
        slug: [path],
      },
    };
  });

  return { paths, fallback: false };
}

export default Review;
