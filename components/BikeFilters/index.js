import selectOptions from './selectOptions';
import Select from '../Select';
import * as gtag from '../../lib/gtag';

const BikeFilters = ({
  filterSelections,
  setFilterSelections,
  filtersShow,
  setFiltersShown,
  companiesState,
  setCompaniesState,
}) => {
  const handleFilterChange = (event, category) => {
    setFilterSelections({
      ...filterSelections,
      [category]: event.target.value,
    });
    gtag.event({
      action: 'filters_applied',
      category: 'bikes',
      label: 'Bike Filters Applied',
      value: category,
    });
  };

  const handleReset = () => {
    setFilterSelections({
      price: '0',
      motor: '0',
      battery: '0',
      range: '0',
      top_speed: '0',
      voltage: '0',
      suspension: '0',
    });
  };

  const handleSearch = () => {
    setFiltersShown(false);
  };

  let manufacturerOptions = [{ value: 0, label: 'All' }];
  const manufacturerOptions2 = companiesState.map((company) => ({
    value: company.company_id,
    label: company.title,
  }));
  manufacturerOptions = [...manufacturerOptions, ...manufacturerOptions2];

  const selectClasses =
    'flex flex-col p-2 lg:px-0 w-1/2 sm:w-1/4 md:w-auto lg:w-full';

  return (
    <div>
      <form
        className="flex flex-wrap lg:block lg:w-full items-end"
        id="bike-filters"
        onSubmit={handleReset}
      >
        <Select
          className={selectClasses}
          options={selectOptions.price}
          value={filterSelections.min_price}
          label="Min Price"
          formId="bike-filters"
          name="min_price"
          onChange={(event) => handleFilterChange(event, 'min_price')}
        />

        <Select
          className={selectClasses}
          options={selectOptions.price}
          value={filterSelections.max_price}
          label="Max Price"
          formId="bike-filters"
          name="max_price"
          onChange={(event) => handleFilterChange(event, 'max_price')}
        />

        <Select
          className={selectClasses}
          options={selectOptions.motor}
          value={filterSelections.motor}
          label="Min Motor"
          formId="bike-filters"
          name="motor"
          onChange={(event) => handleFilterChange(event, 'motor')}
        />

        <Select
          className={selectClasses}
          options={selectOptions.battery}
          value={filterSelections.battery}
          label="Min Battery"
          formId="bike-filters"
          name="battery"
          onChange={(event) => handleFilterChange(event, 'battery')}
        />

        <Select
          className={selectClasses}
          options={selectOptions.voltage}
          value={filterSelections.voltage}
          label="Min Volts"
          formId="bike-filters"
          name="voltage"
          onChange={(event) => handleFilterChange(event, 'voltage')}
        />

        <Select
          className={selectClasses}
          options={selectOptions.range}
          value={filterSelections.range}
          label="Min Range"
          formId="bike-filters"
          name="range"
          onChange={(event) => handleFilterChange(event, 'range')}
        />

        <Select
          className={selectClasses}
          options={selectOptions.top_speed}
          value={filterSelections.top_speed}
          label="Min Top Speed"
          formId="bike-filters"
          name="top_speed"
          onChange={(event) => handleFilterChange(event, 'top_speed')}
        />

        <Select
          className={selectClasses}
          options={selectOptions.suspension}
          value={filterSelections.suspension}
          label="Suspension"
          formId="bike-filters"
          name="suspension"
          onChange={(event) => handleFilterChange(event, 'suspension')}
        />

        <Select
          className={selectClasses}
          options={manufacturerOptions}
          value={filterSelections.manufacturer}
          label="Manufacturer"
          formId="bike-filters"
          name="manufacturer"
          onChange={(event) => handleFilterChange(event, 'manufacturer')}
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

export default BikeFilters;

//  <input
//           className="bg-white shadow-inner rounded-l py-2 px-4 flex-1 border border-gray-300"
//           id="email"
//           type="email"
//           aria-label="email address"
//           placeholder="Enter your email address"
//         />
//         <button
//           className="bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow py-2 px-4 rounded"
//           type="submit"
//         >
//           Sign Up
//         </button>
