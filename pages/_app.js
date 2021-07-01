import '../styles/global.scss';

const App = ({ Component, pageProps }) => (
  <Component {...pageProps} currentPage setCurrentPage />
);

export default App;
