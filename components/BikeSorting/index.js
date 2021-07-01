import sortOptions from './sortOptions';

const BikeSorting = ({ sortSelections, setSortSelections }) => {
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

  return (
    <div className="items-center flex -mx-2">
      <form className="flex flex-wrap lg:block lg:w-full" id="bike-filters">
        <div className="flex flex-col p-2 w-1/3 sm:w-1/4 md:w-1/5 lg:w-full">
          <label
            className="uppercase text-xs font-bold tracking-wider"
            htmlFor="price"
          >
            Sort By:
          </label>
          <select
            value={sortSelections.price}
            name="price"
            id="price"
            form="bike-filters"
            className="bg-white shadow-inner rounded py-2 px-4 flex-1 border border-gray-300"
            onChange={(event) => handleSortChange(event, 'fields')}
          >
            {sortOptions.fields.map((option) => (
              <option
                key={option.value}
                value={option.value}
                data-type={option.type}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col p-2 w-1/3 sm:w-1/4 md:w-1/5 lg:w-full">
          <label
            className="uppercase text-xs font-bold tracking-wider"
            htmlFor="motor"
          >
            Sort Direction:
          </label>
          <select
            value={sortSelections.motor}
            name="motor"
            id="motor"
            form="bike-filters"
            className="bg-white shadow-inner rounded-l py-2 px-4 flex-1 border border-gray-300"
            onChange={(event) => handleSortChange(event, 'directions')}
          >
            {sortOptions.directions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default BikeSorting;

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
