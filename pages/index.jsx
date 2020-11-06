import { Component } from 'react'
import * as MDB from 'mdbreact'

import { withRouter } from 'next/router'
import Button from '../components/Button'

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      '0': {
        width: 150,
        height: 225
      },
      
      '1': {
        width: 150,
        height: 225
      },

      '2': {
        width: 150,
        height: 225
      },

      '3': {
        width: 150,
        height: 225
      },

      '4': {
        width: 150,
        height: 225
      }
    }

    this.imageMouseEnter = this.imageMouseEnter.bind(this)
    this.imageMouseLeave = this.imageMouseLeave.bind(this)
    this.mouseClick      = this.mouseClick.bind(this)
  }

  mouseClick() {
    this.props.router.push('/movies')
  }

  imageMouseEnter(evt) {
    const id = parseInt(evt.target.id)

    this.state[id].width  += 25
    this.state[id].height += 50

    this.setState(this.state)
  }

  imageMouseLeave(evt) {
    const id = parseInt(evt.target.id)

    this.state[id].width  -= 25
    this.state[id].height -= 50

    this.setState(this.state)
  }

  render() {
    return (
      <div style={
          {
            marginBottom: '20px'
          }
        }
      >
        <MDB.MDBJumbotron className='bg-transparent mb-0 rounded-0 shadow-none border-0'>
          <center>
            <h1 className='text-white'>
              <strong>Site Name</strong>
            </h1>

            <p className='mt-3 text-white w-50'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <Button
              borderColor='white'
              innerColor='#00000000'
              innerColorOnHover='white'
              textColor='white'
              textColorOnHover='black'
              mouseClick={this.mouseClick}
            >
              <div style={
                  {
                    margin: '5px 20px 5px 20px'
                  }
                }
              >
                Search for Movies
              </div>
            </Button>
          </center>
        </MDB.MDBJumbotron>

        <hr className='bg-light w-75' />

        <MDB.Card className='bg-transparent rounded-0 shadow-none'>
          <MDB.MDBContainer>
            <center>
              <h3 className='text-white'>Top Movies per Category</h3>

              <div>
                {['', '', '', '', ''].map(
                    (_, index) => (
                      <a
                        href='#'
                        key={index}
                      >
                        <img
                          id={index}
                          className='rounded'
                          src='/images/image.jpg'
                          width={this.state[index].width}
                          height={this.state[index].height}
                          onMouseEnter={this.imageMouseEnter}
                          onMouseLeave={this.imageMouseLeave}
                          onClick={this.imageClick}
                          style={
                            {
                              transition: '.3s',
                              margin: '0px 5px 5px 0px'
                            }
                          }
                        />
                      </a>
                    )
                  )
                }
              </div>
            </center>
          </MDB.MDBContainer>
        </MDB.Card>

        <hr className='w-75 mw-75 bg-light' />
        <MDB.MDBCard className='bg-transparent shadow-none'>
          <MDB.MDBContainer>
            <center className='text-white'>
              <h4>Want to nominate a movie?</h4>
              <Button
                borderColor='white'
                innerColor='#00000000'
                innerColorOnHover='white'
                textColor='white'
                textColorOnHover='black'
              >
                <p
                  style={
                    {
                      margin: '5px 20px 5px 20px'
                    }
                  }
                >
                  Login to Nominate
                </p>
              </Button>
            </center>
          </MDB.MDBContainer>
        </MDB.MDBCard>
      </div>
    )
  }
}

export default withRouter(Index)