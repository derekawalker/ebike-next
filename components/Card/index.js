import Image from 'next/image';
import Icon from '../Icon';

const Card = ({ icon, title, color, children, image }) => (
  <div className="md:flex-1 text-center border border-gray-300 bg-white shadow-lg rounded-xl overflow-hidden h-full">
    {image && (
      <div className="w-full h-64 md:h-48 relative">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    )}

    <div className={`text-${color} bg-gray-800 text-center flex p-6`}>
      <Icon icon={icon} className="flex-grow w-16 h-16" />
    </div>
    <div className="px-8 py-6">
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      {children}
    </div>
  </div>
);

export default Card;
