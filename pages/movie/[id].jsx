import { Component } from 'react'
import { withRouter } from 'next/router'
import * as MDB from 'mdbreact'

class Movie extends Component {
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    if (!this.props.id)
      return this.props.router.push('/movies')
  }

  render() {
    if (!this.props.id) return null

    return (
      <div className='m-5'>
        <MDB.MDBCard>
          <MDB.MDBContainer>
            <MDB.MDBRow>
              <MDB.MDBCol>
                <MDB.MDBCard className='rounded-0 shadow'>
                  
                </MDB.MDBCard>
              </MDB.MDBCol>
            </MDB.MDBRow>
          </MDB.MDBContainer>
        </MDB.MDBCard>
      </div>
    )
  }
}

Movie.getInitialProps = (ctx) => (
  { id: ctx.query.id }
)

export default withRouter(Movie)