import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import Layout from '../../components/Layout';
import Stat from '../../components/Stat';
import Card from '../../components/Card';
// Styles
import { variables } from '../../styles/style-variables';

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
  console.log(params);

  const thisSlug = params.slug[0];
  console.log(thisSlug);
  const product = _.filter(
    products,
    (item) => item.path.substring(1) === thisSlug
  );

  const thisProduct = product[0];

  return (
    <Layout
      title={`${thisProduct.title}`}
      type="product"
      description={`A list of eBikes made by ${thisProduct.title}, an electric product product.`}
      image={thisProduct.image}
    >
      <article className="">
        <div className="">
          <div className="border-b">
            <div
              className={`w-full  border-b p-7 bg-${thisProduct.background}`}
            >
              <div className="relative h-16">
                <Image
                  src={thisProduct.image}
                  alt={thisProduct.title}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${variables.sitePadding} `}>
          <h1 className="text-2xl font-bold ">{thisProduct.title}</h1>
          {thisProduct.link && (
            <div className="font-bold mb-3 ">
              <a
                href={thisProduct.link}
                className="border rounded-3xl border-blue-500 text-blue-500 uppercase tracking-wider px-4 py-2 block text-center bg-blue-100"
              >
                Visit Website
              </a>
            </div>
          )}
          <div
            className="mb-3 border-t border-gray-300 pt-3"
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
