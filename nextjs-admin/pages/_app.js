import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout';
import Realtime from '../components/Realtime';

function MyApp({ Component, pageProps }) {
  return (
    // <Realtime>
    <div>
      <Layout/>
        <Component {...pageProps} />
        <Realtime/>
      {/* </Layout> */}
    {/* // </Realtime> */}
    </div>
  );
}

export default MyApp;
