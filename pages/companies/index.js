import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../../components/Layout';
import Card from '../../components/Card';

import { CompanyContext } from '../../contexts/CompanyContext';
import Stat from '../../components/Stat';

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
  const [companyState, setCompanyState] = useContext(CompanyContext);

  useEffect(() => {
    if (companies) {
      setCompanyState({ companies });
    }
  }, [companyState.companies]);

  let companyOutput = companies.map((company) => (
    <div className="w-1/2 md:w-1/3 xl:w-1/4 p-2" key={company.company_id}>
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
    <Layout title="Companies">
      <section className={variables.sitePadding}>
        <h1 className="text-2xl font-black uppercase tracking-wider">
          eCompanies
        </h1>
        <p>This is the companies page.</p>
        <div className="lg:flex">
          <section className="flex flex-row flex-wrap -mx-2 my-2 lg:w-4/5">
            {companyOutput}
          </section>
        </div>
      </section>
    </Layout>
  );
};

Companies.propTypes = {};

export default Companies;
