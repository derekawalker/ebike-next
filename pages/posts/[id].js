import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/Layout';
import Date from '../../components/Date';

// Styles
import { variables } from '../../styles/style-variables';
import styles from './styles.module.scss';

export default function Post({ postData }) {
  return (
    <Layout>
      <article className={variables.sitePadding}>
        <h1 className="text-2xl font-bold mb-3">{postData.title}</h1>
        <div className="text-xs uppercase tracking-wider font-light mb-3 text-gray-400">
          <Date dateString={postData.date} />
        </div>
        <div
          className={styles.container}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
