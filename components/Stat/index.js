import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Stat = ({ icon, title, color, tooltip, children }) => {
  let tooltipOutput;

  if (tooltip) {
    tooltipOutput = (
      <div className="relative flex flex-col items-center group ml-1">
        <FontAwesomeIcon
          icon="info-circle"
          className="w-3 text-gray-300 group-hover:text-gray-500"
        />
        <div className="absolute bottom-0 flex flex-col items-center opacity-0 mb-4 group-hover:opacity-100">
          <span className="rounded relative z-10 px-2 py-1 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-xl normal-case">
            {tooltip}
          </span>
          <div className="w-3 h-3 -mt-2 bg-black transform rotate-45" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex border-b  border-gray-400 border-opacity-25 items-center">
      {icon && (
        <div className={`${color} text-center flex py-3 pr-3 w-10 md:w-14`}>
          <FontAwesomeIcon icon={icon} className="flex-grow h-7 md:h-8" />
        </div>
      )}
      <div className="pt-2 pb-1 md:py-2 flex-grow">
        <h4 className="font-bold uppercase text-xs tracking-wider flex items-center">
          {title}
          {tooltipOutput}
        </h4>
        <div className="font-thin text-sm md:text-base">{children}</div>
      </div>
    </div>
  );
};

export default Stat;
