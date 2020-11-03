import * as MDB from 'mdbreact'

import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const App =
  (ctx) => (
    <MDB.MDBContainer>
      <ctx.Component {...ctx.pageProps} />
    </MDB.MDBContainer>
  )

export default App