import Icon from '../Icon';

const Stat = ({ icon, title, color, children }) => (
  <div className="flex border-t  border-gray-400 border-opacity-25">
    {icon && (
      <div className={`${color} text-center flex py-3 pr-3`}>
        <Icon icon={icon} className="flex-grow w-10 h-10" />
      </div>
    )}
    <div className="py-3 flex-grow">
      <h4 className="font-bold uppercase text-xs tracking-wider">{title}</h4>
      <div className="font-thin">{children}</div>
    </div>
  </div>
);

export default Stat;
