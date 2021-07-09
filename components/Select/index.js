import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Select = ({
  name,
  label,
  value,
  formId,
  className,
  onChange,
  options,
  tooltip,
}) => {
  let tooltipOutput;

  if (tooltip) {
    tooltipOutput = (
      <div className="relative flex flex-col items-center group ml-1">
        <FontAwesomeIcon
          icon="info-circle"
          className="w-3 text-gray-400 group-hover:text-gray-500"
        />
        <div className="absolute bottom-0 flex flex-col items-center opacity-0 mb-4 group-hover:opacity-100">
          <span className="rounded relative z-10 p-2 text-xs tracking-wider leading-none text-white whitespace-no-wrap bg-black shadow-xl normal-case text-center font-normal">
            {tooltip}
          </span>
          <div className="w-3 h-3 -mt-2 bg-black transform rotate-45" />
        </div>
      </div>
    );
  }
  return (
    <div className={className}>
      <label
        className="uppercase text-xs font-bold tracking-wider flex items-center"
        htmlFor={name}
      >
        {label}
        {tooltipOutput}
      </label>
      <div className="inline-block relative ">
        <select
          value={value}
          name={name}
          id={name}
          form={formId}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <FontAwesomeIcon
            icon="chevron-down"
            className="fill-current h-4 w-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Select;
