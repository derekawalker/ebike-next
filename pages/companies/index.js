import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import Card from '../../components/Card';

// Styles
import { variables } from '../../styles/style-variables';

const companyUrl = 'https://ebikecompanies.com/drupal/api/companies';

export const getStaticProps = async () => {
  const response = await fetch(companyUrl);
  const data = await response.json();

  return {
    props: { companies: data },
  };
};

const Companies = ({ companies }) => (
  <Layout>
    <section className={variables.sitePadding}>
      <h1 className="text-2xl font-black uppercase tracking-wider">
        Companies
      </h1>
      <p>This is the companies page.</p>
      <section className="sm:flex sm:flex-row sm:flex-wrap sm:-mx-2 my-4">
        {companies.map((company) => (
          <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
            <Card
              key={company.company_id}
              title={company.title}
              icon="CheckCircleIcon"
              color="text-green-500"
              image={company.image}
            >
              <div dangerouslySetInnerHTML={{ __html: company.body }} />
            </Card>
          </div>
        ))}
      </section>
    </section>
  </Layout>
);

Companies.propTypes = {
  companies: PropTypes.arrayOf.isRequired,
};

export default Companies;
