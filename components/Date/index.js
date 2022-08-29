import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';

const Date = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
};

export default Date;

Date.propTypes = {
  dateString: PropTypes.string.isRequired,
};
