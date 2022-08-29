import PropTypes from 'prop-types';
import sortOptions from './sortOptions';
import Select from '../Select';

const ProductSorting = ({ sortSelections, setSortSelections }) => {
  const handleSortChange = (event, category) => {
    if (category === 'fields') {
      const fields = sortOptions[category];
      const selectedObject = fields.filter(
        (item) => item.value === event.target.value
      );
      setSortSelections({
        ...sortSelections,
        field: event.target.value,
        type: selectedObject[0].type,
      });
    }

    if (category === 'directions') {
      setSortSelections({
        ...sortSelections,
        direction: event.target.value,
      });
    }
  };

  const selectClasses =
    'flex flex-col p-2 lg:px-0 w-1/2 sm:w-1/4 md:w-auto lg:w-full';

  return (
    <div>
      <form className="flex flex-wrap lg:block lg:w-full" id="bike-sorting">
        <Select
          className={selectClasses}
          options={sortOptions.fields}
          value={sortSelections.field}
          label="Sort By"
          formId="bike-sorting"
          name="field"
          onChange={(event) => handleSortChange(event, 'fields')}
        />

        <Select
          className={selectClasses}
          options={sortOptions.directions}
          value={sortSelections.direction}
          label="Sort Direction"
          formId="bike-sorting"
          name="direction"
          onChange={(event) => handleSortChange(event, 'directions')}
        />
      </form>
    </div>
  );
};

export default ProductSorting;

ProductSorting.propTypes = {
  sortSelections: PropTypes.string.isRequired,
  setSortSelections: PropTypes.string.isRequired,
};
