import Link from 'next/link';
import _ from 'lodash';
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

const Companies = ({ companies }) => {
  let companyOutput = companies.map((company) => (
    <div
      className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
      key={company.company_id}
    >
      <Link
        href={`/companies/${company.title.replace(/\s+/g, '-').toLowerCase()}`}
        passHref
      >
        <a href="placeholder">
          <Card
            title={company.title}
            color="green-500"
            image={company.thumbnail}
          >
            <div className="-mt-3 mb-3 uppercase text-xs text-gray-500 tracking-wider font-thin">
              {company.manufacturer}
            </div>
          </Card>
        </a>
      </Link>
    </div>
  ));

  if (!companies.length) {
    companyOutput = (
      <Card title="Sorry!" icon="XIcon" color="text-red-500">
        <p>No Companies match your criteria. Try changing your filters.</p>
      </Card>
    );
  }

  return (
    <Layout title="eBike Companies">
      <section className={variables.sitePadding}>
        <h1 className="text-2xl font-black uppercase tracking-wider">
          eBike Companies
        </h1>
        <p>This is the companies page.</p>
        <div className="">
          <section className="flex flex-row flex-wrap -mx-2 my-2">
            {companyOutput}
          </section>
        </div>
      </section>
    </Layout>
  );
};

Companies.propTypes = {};

export default Companies;
