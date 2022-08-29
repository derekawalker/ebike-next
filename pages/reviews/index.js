import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import Card from '../../components/Card';

// Styles
import { variables } from '../../styles/style-variables';

const reviewUrl = 'https://data.ebikecompanies.com/api/reviews';

export const getStaticProps = async () => {
  const response = await fetch(reviewUrl);
  const data = await response.json();

  return {
    props: { reviews: data },
  };
};

const Reviews = ({ reviews }) => {
  const [reviewsState, setReviewsState] = useState(reviews);

  if (reviews !== reviewsState) {
    setReviewsState(reviews);
  }

  let reviewOutput = reviews.map((review) => (
    <div
      className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-2"
      key={review.review_id}
    >
      <Link href={`/reviews${review.path}`} passHref>
        <a href="placeholder">
          <Card
            title={review.title}
            color="green-500"
            image={review.image}
            rounded
          >
            <div className="uppercase text-xs text-gray-500 tracking-wider font-thin">
              {review.created}
            </div>
          </Card>
        </a>
      </Link>
    </div>
  ));

  if (!reviews.length) {
    reviewOutput = (
      <Card
        title="Sorry!"
        icon="times"
        color="text-red-500 bg-gray-700"
        rounded
        align="center"
      >
        <p>No Reviews available.</p>
      </Card>
    );
  }

  return (
    <Layout title="eBike Reviews" description="eBike reviews and commentary.">
      <section className={variables.sitePadding}>
        <h1 className="text-2xl font-black uppercase tracking-wider">
          eBike Reviews
        </h1>
        <p>Electric bike reviews, comparisons, and commentary.</p>
        <div className="">
          <section className="flex flex-row flex-wrap -mx-2 my-2">
            {reviewOutput}
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;

Reviews.propTypes = {
  reviews: PropTypes.string.isRequired,
};
