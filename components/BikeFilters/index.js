import selectOptions from './selectOptions';

const BikeFilters = ({ filterSelections, setFilterSelections }) => {
  const handleFilterChange = (event, category) => {
    setFilterSelections({
      ...filterSelections,
      [category]: event.target.value,
    });
  };

  return (
    <div className="items-center flex -mx-2">
      <form className="flex flex-wrap lg:block lg:w-full" id="bike-filters">
        <div className="flex flex-col p-2 w-1/3 sm:w-1/4 md:w-auto lg:w-full">
          <label
            className="uppercase text-xs font-bold tracking-wider"
            htmlFor="price"
          >
            Max Price:
          </label>
          <select
            value={filterSelections.price}
            name="price"
            id="price"
            form="bike-filters"
            className="bg-white shadow-inner rounded py-2 px-4 flex-1 border border-gray-300"
            onChange={(event) => handleFilterChange(event, 'price')}
          >
            {selectOptions.price.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col p-2 w-1/3 sm:w-1/4 md:w-auto lg:w-full">
          <label
            className="uppercase text-xs font-bold tracking-wider"
            htmlFor="motor"
          >
            Min Motor:
          </label>
          <select
            value={filterSelections.motor}
            name="motor"
            id="motor"
            form="bike-filters"
            className="bg-white shadow-inner rounded-l py-2 px-4 flex-1 border border-gray-300"
            onChange={(event) => handleFilterChange(event, 'motor')}
          >
            {selectOptions.motor.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col p-2 w-1/3 sm:w-1/4 md:w-auto lg:w-full">
          <label
            className="uppercase text-xs font-bold tracking-wider"
            htmlFor="battery"
          >
            Min Battery:
          </label>
          <select
            value={filterSelections.battery}
            name="battery"
            id="battery"
            form="bike-filters"
            className="bg-white shadow-inner rounded-l py-2 px-4 flex-1 border border-gray-300"
            onChange={(event) => handleFilterChange(event, 'battery')}
          >
            {selectOptions.battery.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col p-2 w-1/3 sm:w-1/4 md:w-auto lg:w-full">
          <label
            className="uppercase text-xs font-bold tracking-wider"
            htmlFor="voltage"
          >
            Min Volts:
          </label>
          <select
            value={filterSelections.voltage}
            name="voltage"
            id="voltage"
            form="bike-filters"
            className="bg-white shadow-inner rounded-l py-2 px-4 flex-1 border border-gray-300"
            onChange={(event) => handleFilterChange(event, 'voltage')}
          >
            {selectOptions.voltage.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col p-2 w-1/3 sm:w-1/4 md:w-auto lg:w-full">
          <label
            className="uppercase text-xs font-bold tracking-wider"
            htmlFor="range"
          >
            Min Range:
          </label>
          <select
            value={filterSelections.range}
            name="range"
            id="range"
            form="bike-filters"
            className="bg-white shadow-inner rounded-l py-2 px-4 flex-1 border border-gray-300"
            onChange={(event) => handleFilterChange(event, 'range')}
          >
            {selectOptions.range.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col p-2 w-1/3 sm:w-1/4 md:w-auto lg:w-full">
          <label
            className="uppercase text-xs font-bold tracking-wider"
            htmlFor="top_speed"
          >
            Min Top Speed:
          </label>
          <select
            value={filterSelections.top_speed}
            name="top_speed"
            id="top_speed"
            form="bike-filters"
            className="bg-white shadow-inner rounded-l py-2 px-4 flex-1 border border-gray-300"
            onChange={(event) => handleFilterChange(event, 'top_speed')}
          >
            {selectOptions.top_speed.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col p-2 w-1/3 sm:w-1/4 md:w-auto lg:w-full">
          <label
            className="uppercase text-xs font-bold tracking-wider"
            htmlFor="suspension"
          >
            Suspension:
          </label>
          <select
            value={filterSelections.suspension}
            name="suspension"
            id="suspension"
            form="bike-filters"
            className="bg-white shadow-inner rounded-l py-2 px-4 flex-1 border border-gray-300"
            onChange={(event) => handleFilterChange(event, 'suspension')}
          >
            {selectOptions.suspension.map((option) => (
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
