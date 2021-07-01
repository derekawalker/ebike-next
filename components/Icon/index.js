import * as Icons from '@heroicons/react/solid';

const Icon = ({ icon, className }) => {
  const { ...icons } = Icons;
  const TheIcon = icons[icon];

  return <TheIcon className={className} />;
};

export default Icon;
