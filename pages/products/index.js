import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { formatMoney } from 'accounting';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import ProductFilters from '../../components/ProductFilters';
import ProductSorting from '../../components/ProductSorting';

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
  const [filtersShown, setFiltersShown] = useState(false);
  const [productsState, setProductsState] = useState(products);
  const [productFiltersState, setProductFiltersState] = useState({
    min_price: '0',
    max_price: '0',
    category: '0',
  });
  const [productSortState, setProductSortState] = useState({
    field: 'price',
    type: 'string',
    direction: 'asc',
  });

  const handleFilterToggle = () => {
    setFiltersShown(!filtersShown);
  };

  if (products !== productsState) {
    setProductsState(products);
  }

  // Apply filters.
  let filteredProducts = productsState;

  // Min Price.
  if (productFiltersState.min_price !== '0') {
    filteredProducts = _.filter(
      filteredProducts,
      (product) =>
        Number(product.price) >= Number(productFiltersState.min_price)
    );
  }

  // Max Price.
  if (productFiltersState.max_price !== '0') {
    filteredProducts = _.filter(
      filteredProducts,
      (product) =>
        Number(product.price) <= Number(productFiltersState.max_price)
    );
  }

  // Category.
  if (productFiltersState.category !== '0') {
    filteredProducts = _.filter(
      filteredProducts,
      (product) =>
        product.category.replace(/\s+/g, '-').toLowerCase() ===
        productFiltersState.category.replace(/\s+/g, '-').toLowerCase()
    );
  }

  // Apply sort.
  if (productSortState.field) {
    filteredProducts = _.sortBy(filteredProducts, [
      (product) => {
        const { field } = productSortState;
        if (productSortState.type === 'number') {
          return Number(product[field]);
        }
        return product[field];
      },
      'title',
    ]);

    if (productSortState.direction !== 'asc') {
      filteredProducts.reverse();
    }
  }

  let productOutput = filteredProducts.map((product) => (
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
            fit="responsive"
            truncate
          >
            <div className="uppercase border-t px-3 text-center rounded-xl bg-green-500 hover:bg-green-400 py-2 text-lg text-white tracking-wider font-bold">
              {formatMoney(product.price)}
            </div>
          </Card>
        </a>
      </Link>
    </div>
  ));

  if (!productsState.length) {
    productOutput = (
      <Card title="Sorry!" icon="times" color="text-red-500">
        <p>No Products available.</p>
      </Card>
    );
  }

  return (
    <Layout
      title="eProduct Products"
      description="eProduct products and commentary."
    >
      <section className={variables.sitePadding}>
        <h1 className="text-2xl font-black uppercase tracking-wider">
          eProduct Products
        </h1>
        <p>This is the products page.</p>
        <div className="lg:flex">
          <div className="rounded-lg mt-3 px-3 py-2 bg-white border border-gray-300 lg:rounded-none lg:bg-transparent lg:border-0 lg:p-0 lg:w-1/5 lg:mr-4">
            <div
              className="flex items-center p-1 justify-between lg:p-0"
              onClick={handleFilterToggle}
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon="filter" className="mr-1 w-3 h-3" />
                <h4 className="font-black tracking-wider uppercase">
                  Filters:
                </h4>
              </div>
              <div className="block lg:hidden w-4">
                {filtersShown ? (
                  <FontAwesomeIcon icon="chevron-up" className="mr-1" />
                ) : (
                  <FontAwesomeIcon icon="chevron-down" className="mr-1" />
                )}
              </div>
            </div>

            <section
              className={`pb-2 lg:mr-3 lg:pr-3 l lg:py-0 lg:w-full ${
                filtersShown ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="border-t border-gray-400 border-dashed pt-3 lg:pt-0 lg:border-0">
                <ProductFilters
                  productsState={productsState}
                  filterSelections={productFiltersState}
                  setFilterSelections={setProductFiltersState}
                  filtersShown={filtersShown}
                  setFiltersShown={setFiltersShown}
                />
              </div>

              <div className="flex items-center mt-4 border-t pt-4 border-gray-400 border-dashed">
                <FontAwesomeIcon icon="sort" className="w-3 h-3 mr-1" />
                <h4 className="font-black tracking-wider uppercase">Sort:</h4>
              </div>
              <ProductSorting
                sortSelections={productSortState}
                setSortSelections={setProductSortState}
              />
            </section>
          </div>
          <section className="lg:w-4/5">
            <div className="flex flex-row flex-wrap -mx-1 lg:-mx-2 my-2">
              {productOutput}
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

Products.propTypes = {};

export default Products;
