import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Icon = ({ icon, className }) => (
  <FontAwesomeIcon icon={icon} className={className} />
);

export default Icon;

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
