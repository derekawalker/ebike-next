import Image from 'next/image';
import Icon from '../Icon';

const Card = ({ icon, title, color, children, image }) => (
  <div className="md:flex-1 text-center border border-gray-300 bg-white shadow-lg rounded-xl overflow-hidden h-full">
    {image && (
      <div className="w-full relative border-b">
        <Image
          src={image}
          alt={title}
          layout="responsive"
          height={400}
          width={600}
        />
      </div>
    )}

    {icon && (
      <div className={`${color} bg-gray-800 text-center flex p-6`}>
        <Icon icon={icon} className="flex-grow w-16 h-16" />
      </div>
    )}
    <div className="px-8 py-6">
      <h4 className="text-xl font-bold mb-4 leading-tight">{title}</h4>
      {children}
    </div>
  </div>
);

export default Card;
