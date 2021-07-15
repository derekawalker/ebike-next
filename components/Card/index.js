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
  rounded,
  truncate,
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
      className={`md:flex-1 text-${align} border border-gray-300 bg-white shadow-lg relative ${
        rounded ? 'rounded-xl' : ''
      } overflow-hidden h-full`}
    >
      {image && imageOutput}
      {icon && (
        <div className={`${color} text-${align} flex p-2  w-full`}>
          <FontAwesomeIcon icon={icon} className="flex-grow w-4 h-4" />
        </div>
      )}
      <div className="px-4 py-3">
        <h4
          className={`text-lg font-bold mb-2 leading-tight ${
            truncate ? 'truncate' : null
          }`}
        >
          {title}
        </h4>
        {children}
      </div>
    </div>
  );
};

export default Card;
