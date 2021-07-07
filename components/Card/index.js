import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({
  icon,
  title,
  color,
  children,
  image,
  fit,
  background,
  align,
}) => {
  let backgroundColor = 'bg-white';

  if (background === 'black') {
    backgroundColor = 'bg-black';
  }

  if (background === 'gray') {
    backgroundColor = 'bg-gray-400';
  }

  let imageOutput = (
    <div className={`w-full relative border-b h-48 ${backgroundColor}`}>
      <Image src={image} alt={title} layout="fill" objectFit={fit || 'cover'} />
    </div>
  );

  if (fit === 'contain') {
    imageOutput = (
      <div className={`w-full  border-b py-3 px-7 ${backgroundColor}`}>
        <div className="relative h-36">
          <Image src={image} alt={title} layout="fill" objectFit="contain" />
        </div>
      </div>
    );
  }

  if (fit === 'responsive') {
    imageOutput = (
      <div className={`w-full relative border-b ${backgroundColor}`}>
        <Image
          src={image}
          alt={title}
          layout="responsive"
          height={300}
          width={400}
        />
      </div>
    );
  }
  return (
    <div
      className={`md:flex-1 text-${align} border border-gray-300 bg-white shadow-lg rounded-xl overflow-hidden h-full`}
    >
      {image && imageOutput}

      {icon && (
        <div className={`${color} bg-gray-800 text-${align} flex p-6`}>
          <FontAwesomeIcon icon={icon} className="flex-grow w-16 h-16" />
        </div>
      )}
      <div className="px-6 py-4 md:px-4 md:py-3">
        <h4 className="text-xl font-bold mb-4 leading-tight">{title}</h4>
        {children}
      </div>
    </div>
  );
};

export default Card;
