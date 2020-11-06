import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import '../public/style.css'

import Head from 'next/head'

const App =
  (ctx) => (
    <div>
      <Head>
        <title>Site Name</title>
      </Head>

      <ctx.Component {...ctx.pageProps} />
    </div>
  )

export default App