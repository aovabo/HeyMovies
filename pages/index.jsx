import { Component } from 'react'
import * as MDB from 'mdbreact'

class Index extends Component {
  render() {
    return (
      <MDB.Card
        style={
          {
            marginTop: '20px',
            marginBottom: '20px'
          }
        }
      >
        <MDB.MDBCardHeader>
          <h1>Hello World!</h1>
        </MDB.MDBCardHeader>
        <MDB.MDBCardBody>
          <p>Hello</p>
        </MDB.MDBCardBody>
      </MDB.Card>
    )
  }
}

export default Index