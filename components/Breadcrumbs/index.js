import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import { variables } from '../../styles/style-variables';

const Breadcrumbs = ({ type, breadcrumbs }) => (
  <>
    {type !== 'home' && (
      <nav className={`${styles.breadcrumbs} ${variables.sitePaddingX} `}>
        <ol>
          <li>
            <Link href="/" passHref>
              <a href="placeholder">Home</a>
            </Link>
          </li>

          {type !== 'home' &&
            breadcrumbs &&
            breadcrumbs.map((item) => (
              <li>
                <Link href={`/${item.value}`} passHref>
                  <a href="placeholder">{item.label}</a>
                </Link>
              </li>
            ))}
        </ol>
      </nav>
    )}
  </>
);

export default Breadcrumbs;

Breadcrumbs.propTypes = {
  type: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.string.isRequired,
};
