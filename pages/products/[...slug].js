import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import Layout from '../../components/Layout';
import Stat from '../../components/Stat';
import Card from '../../components/Card';

// Styles
import { variables } from '../../styles/style-variables';
import styles from './styles.module.scss';

const productUrl = 'https://data.ebikecompanies.com/api/products';

export const getStaticProps = async ({ params }) => {
  const productRes = await fetch(productUrl);
  const productData = await productRes.json();

  return {
    props: {
      products: productData,
      params,
    },
    revalidate: 1,
  };
};

const Product = ({ products, params }) => {
  const thisSlug = params.slug[0];
  const product = _.filter(
    products,
    (item) => item.path.substring(1) === thisSlug
  );

  const thisProduct = product[0];

  return (
    <Layout
      title={`${thisProduct.title}`}
      type="accessories"
      breadcrumbs={[{ label: 'accessories', value: 'products' }]}
      description={`Specs and pricing for ${thisProduct.title} by ${thisProduct.manufacturer}.`}
      image={thisProduct.image}
    >
      <article className="sm:flex sm:flex-row sm:flex-wrap ">
        <div className={` sm:w-1/2 md:w-3/5 bg-white `}>
          <div className="border-b ">
            <Image
              src={thisProduct.image}
              alt={thisProduct.title}
              width={4000}
              height={3000}
              objectFit="responsive"
            />
          </div>
        </div>

        <div className={`${variables.sitePadding} sm:w-1/2 md:w-2/5`}>
          <h1 className="text-xl">{thisProduct.title}</h1>

          <div className="font-bold text-green-500 text-2xl border-b border-gray-300 pb-3 mb-3">
            {formatMoney(thisProduct.price)}
          </div>
          {thisProduct.link && (
            <div className="font-bold mb-3 ">
              <a
                target="_blank"
                href={thisProduct.link}
                className="border rounded-3xl border-green-500 text-green-500 uppercase tracking-wider px-4 py-2 block text-center bg-green-100"
                rel="noreferrer"
              >
                Buy Now
              </a>
            </div>
          )}
          <div
            className={styles.productWrapper}
            dangerouslySetInnerHTML={{ __html: thisProduct.body }}
          />
        </div>
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(productUrl);
  const products = await res.json();

  const paths = products.map((product) => {
    const path = product.path.substring(1);

    return {
      params: {
        slug: [path],
      },
    };
  });

  return { paths, fallback: false };
}

export default Product;
