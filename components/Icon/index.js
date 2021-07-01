import * as Icons from '@heroicons/react/outline';

const Icon = ({ icon, className }) => {
  const { ...icons } = Icons;
  const TheIcon = icons[icon];

  return <TheIcon className={className} />;
};

export default Icon;
