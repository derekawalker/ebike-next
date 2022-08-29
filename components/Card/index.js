import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

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
  iconSize,
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

  const iconOutput = (
    <div
      className={`${color} text-${align} flex ${
        iconSize === 'lg' ? 'p-3' : 'p-2'
      }  w-full`}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`flex-grow ${iconSize === 'lg' ? 'w-10 h-10' : 'w-4 h-4'}`}
      />
    </div>
  );
  return (
    <div
      className={`md:flex-1 text-${align} border border-gray-300 bg-white shadow-lg relative ${
        rounded ? 'rounded-xl' : ''
      } overflow-hidden h-full`}
    >
      {image && imageOutput}
      {icon && iconOutput}
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

Card.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  fit: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  align: PropTypes.string.isRequired,
  rounded: PropTypes.string.isRequired,
  truncate: PropTypes.string.isRequired,
  iconSize: PropTypes.string.isRequired,
};
