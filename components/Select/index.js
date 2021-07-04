import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Select = ({
  name,
  label,
  value,
  formId,
  className,
  onChange,
  options,
}) => (
  <div className={className}>
    <label
      className="uppercase text-xs font-bold tracking-wider"
      htmlFor={name}
    >
      {label}:
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
        <FontAwesomeIcon icon="chevron-down" className="fill-current h-4 w-4" />
      </div>
    </div>
  </div>
);

export default Select;
