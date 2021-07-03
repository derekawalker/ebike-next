import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { formatMoney } from 'accounting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../../components/Layout';
import Stat from '../../components/Stat';
// Styles
import { variables } from '../../styles/style-variables';

const companyUrl = 'https://ebikecompanies.com/drupal/api/companies';

export const getStaticProps = async ({ params }) => {
  const response = await fetch(companyUrl);
  const data = await response.json();

  return {
    props: {
      companies: data,
      params,
    },
  };
};

const Company = ({ companies, params }) => {
  console.log(companies, params);
  const company = _.filter(
    companies,
    (item) =>
      item.title.replace(/\s+/g, '-').toLowerCase() ===
      params.slug[0].replace(/\s+/g, '-').toLowerCase()
  );
  const thisCompany = company[0];

  return (
    <Layout title={`${thisCompany.title}`} type="company">
      <article className="">
        <div className="">
          <div className="border-b ">
            <Image
              src={thisCompany.image}
              alt={thisCompany.title}
              layout="responsive"
              width={3000}
              height={2000}
            />
          </div>
        </div>

        <div className={`${variables.sitePadding} `}>
          <h1 className="text-2xl font-bold ">{thisCompany.title}</h1>
          {thisCompany.link && (
            <div className="font-bold mb-3 ">
              <a
                href={thisCompany.link}
                className="border rounded-3xl border-blue-500 text-blue-500 uppercase tracking-wider px-4 py-2 block text-center bg-blue-100"
              >
                Visit Website
              </a>
            </div>
          )}
          <div
            className="mb-3 border-t border-gray-300 pt-3"
            dangerouslySetInnerHTML={{ __html: thisCompany.body }}
          />
        </div>
      </article>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(companyUrl);
  const companies = await res.json();

  const paths = companies.map((company) => ({
    params: {
      slug: [`${company.title.replace(/\s+/g, '-').toLowerCase()}`],
    },
  }));

  return { paths, fallback: false };
}

export default Company;
