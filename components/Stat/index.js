import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Stat = ({ icon, title, color, children }) => (
  <div className="flex border-b  border-gray-400 border-opacity-25 items-center">
    {icon && (
      <div className={`${color} text-center flex py-3 pr-3 w-10 md:w-14`}>
        <FontAwesomeIcon icon={icon} className="flex-grow h-7 md:h-8" />
      </div>
    )}
    <div className="pt-2 pb-1 md:py-2 flex-grow">
      <h4 className="font-bold uppercase text-xs tracking-wider">{title}</h4>
      <div className="font-thin text-sm md:text-base">{children}</div>
    </div>
  </div>
);

export default Stat;
