import { Component } from 'react'
import * as MDB from 'mdbreact'

import Button from '../components/Button'

class Index extends Component {
  render() {
    return (
      <div>
        <MDB.MDBJumbotron
          className='mb-0 rounded-0 shadow-none border-0'
          style={
            {
              backgroundImage: 'linear-gradient(#434343, #000000 50%)'
            }
          }
        >
          <center>
            <h1 className='text-white'>
              <strong>Site Name</strong>
            </h1>

            <p className='mt-3 text-white w-50'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <Button
              borderColor='white'
              innerColor='#00000000'
              innerColor2='#a8a8a8'
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
                Test Button
              </div>
            </Button>
          </center>
        </MDB.MDBJumbotron>

        <hr className='bg-light w-75' />

        <MDB.Card
          className='bg-transparent rounded-0 shadow-none'
        >
          <MDB.MDBContainer>
            <center>
              <h3 className='text-white'>Top 5 Nominated Movies</h3>
              {['', '', '', '', ''].map(
                  (_, index) => (
                    <img
                      className='rounded'
                      key={index}
                      src='/images/image.jpg'
                      width={150}
                      height={225}
                      style={
                        {
                          marginRight: '10px'
                        }
                      }
                    />
                  )
                )
              }
            </center> 
          </MDB.MDBContainer>
        </MDB.Card>
      </div>
    )
  }
}

export default Index