import Link from 'next/link';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { useCompanyContext } from '../../contexts/companies';

// Styles
import { variables } from '../../styles/style-variables';

const companyUrl = 'https://data.ebikecompanies.com/api/companies';

export const getStaticProps = async () => {
  const response = await fetch(companyUrl);
  const data = await response.json();

  return {
    props: { companies: data },
  };
};

const Companies = ({ companies }) => {
  const [companiesState, setCompaniesState] = useCompanyContext();

  if (companies !== companiesState) {
    setCompaniesState(companies);
  }

  let companyOutput = companies.map((company) => (
    <div
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
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
            image={company.image}
            fit="contain"
            rounded
            background={company.background}
            align="center"
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
      <Card title="Sorry!" icon="times" color="text-red-500">
        <p>No Companies match your criteria. Try changing your filters.</p>
      </Card>
    );
  }

  return (
    <Layout
      title="eBike Companies"
      description="A list of the best eBike companies and manufacturers of electric bikes."
    >
      <section className={variables.sitePadding}>
        <h1 className="text-2xl font-black uppercase tracking-wider">
          Electric Bike Companies
        </h1>
        <p>A selection of the best electric bike companies out there.</p>
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
