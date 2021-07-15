import selectOptions from './selectOptions';
import Select from '../Select';
import * as gtag from '../../lib/gtag';

const ProductFilters = ({
  filterSelections,
  setFilterSelections,
  filtersShow,
  setFiltersShown,
  productsState,
  setCompaniesState,
}) => {
  const handleFilterChange = (event, category) => {
    setFilterSelections({
      ...filterSelections,
      [category]: event.target.value,
    });
    gtag.event({
      action: 'filters_applied',
      category: 'products',
      label: 'Product Filters Applied',
      value: 1,
    });
  };

  const handleReset = () => {
    setFilterSelections({
      min_price: '0',
      max_price: '0',
      category: '0',
    });
  };

  const handleSearch = () => {
    setFiltersShown(false);
  };

  let categoryOptions = [{ value: 0, label: 'All' }];
  const categoryOptions2 = [
    ...new Set(productsState.map((item) => item.category)),
  ];
  const categoryOptions3 = categoryOptions2.map((item) => ({
    value: item.replace(/\s+/g, '-').toLowerCase(),
    label: item,
  }));
  categoryOptions = [...categoryOptions, ...categoryOptions3];

  const selectClasses =
    'flex flex-col p-2 lg:px-0 w-1/2 sm:w-1/4 md:w-auto lg:w-full';

  return (
    <div>
      <form
        className="flex flex-wrap lg:block lg:w-full items-end"
        id="product-filters"
        onSubmit={handleReset}
      >
        <Select
          className={selectClasses}
          options={selectOptions.price}
          value={filterSelections.min_price}
          label="Min Price"
          formId="product-filters"
          name="min_price"
          onChange={(event) => handleFilterChange(event, 'min_price')}
        />

        <Select
          className={selectClasses}
          options={selectOptions.price}
          value={filterSelections.max_price}
          label="Max Price"
          formId="product-filters"
          name="max_price"
          onChange={(event) => handleFilterChange(event, 'max_price')}
        />

        <Select
          className={selectClasses}
          options={categoryOptions}
          value={filterSelections.category}
          label="Category"
          formId="product-filters"
          name="category"
          onChange={(event) => handleFilterChange(event, 'category')}
        />

        <div className="flex-grow flex flex-wrap flex-row">
          <div className={selectClasses}>
            <button
              className="bg-red-500 hover:bg-yellow-500 duration-300 text-white shadow py-2 px-4 rounded"
              type="submit"
            >
              Reset
            </button>
          </div>
          <div className={`${selectClasses} lg:hidden`}>
            <button
              className="bg-blue-500 hover:bg-green-500 duration-300 text-white shadow py-2 px-4 rounded"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductFilters;
