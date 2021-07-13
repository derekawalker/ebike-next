import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Card from '../../components/Card';

// Styles
import { variables } from '../../styles/style-variables';

const productUrl = 'https://data.ebikecompanies.com/api/products';

export const getStaticProps = async () => {
  const response = await fetch(productUrl);
  const data = await response.json();

  return {
    props: { products: data },
  };
};

const Products = ({ products }) => {
  const [productsState, setProductsState] = useState(products);

  if (products !== productsState) {
    setProductsState(products);
  }

  let productOutput = products.map((product) => (
    <div
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
      key={product.product_id}
    >
      <Link href={`/products${product.path}`} passHref>
        <a href="placeholder">
          <Card
            title={product.title}
            color="green-500"
            image={product.image}
            rounded
          >
            <div className="uppercase text-xs text-gray-500 tracking-wider font-thin">
              {product.created}
            </div>
          </Card>
        </a>
      </Link>
    </div>
  ));

  if (!products.length) {
    productOutput = (
      <Card title="Sorry!" icon="times" color="text-red-500">
        <p>No Products available.</p>
      </Card>
    );
  }

  return (
    <Layout title="eBike Products" description="eBike products and commentary.">
      <section className={variables.sitePadding}>
        <h1 className="text-2xl font-black uppercase tracking-wider">
          eBike Products
        </h1>
        <p>This is the products page.</p>
        <div className="">
          <section className="flex flex-row flex-wrap -mx-2 my-2">
            {productOutput}
          </section>
        </div>
      </section>
    </Layout>
  );
};

Products.propTypes = {};

export default Products;
