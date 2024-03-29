import PropTypes from 'prop-types';
import selectOptions from './selectOptions';
import Select from '../Select';
import * as gtag from '../../lib/gtag';

const BikeFilters = ({
  filterSelections,
  setFilterSelections,
  setFiltersShown,
  companiesState,
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
      value: 1,
    });
  };

  const handleReset = () => {
    setFilterSelections({
      min_price: '0',
      max_price: '0',
      motor: '0',
      battery: '0',
      range: '0',
      top_speed: '0',
      voltage: '0',
      suspension: '0',
      motor_type: '0',
      manufacturer: '0',
    });
  };

  const handleSearch = () => {
    setFiltersShown(false);
  };

  let manufacturerOptions = [{ value: 0, label: 'Any' }];
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
          options={selectOptions.motor_type}
          value={filterSelections.motor_type}
          label="Motor Type"
          formId="bike-filters"
          name="motor_type"
          onChange={(event) => handleFilterChange(event, 'motor_type')}
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
          tooltip="max pedal-assisted range"
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

BikeFilters.propTypes = {
  filterSelections: PropTypes.string.isRequired,
  setFilterSelections: PropTypes.string.isRequired,
  setFiltersShown: PropTypes.string.isRequired,
  companiesState: PropTypes.string.isRequired,
};
