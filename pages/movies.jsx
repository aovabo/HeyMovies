import { Component } from 'react'
import * as MDB from 'mdbreact'
import Button from '../components/Button'
import axios from 'axios'
import querystring from 'querystring'
import { withRouter } from 'next/router'

class Movies extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieName: '',
      isLoadingMovies: false,
      movies: [],
      errorMessage: '',
      page: 1,
      showMoreDisabled: false,
      currentSearch: ''
    }

    this.onChangeSearchName = this.onChangeSearchName.bind(this)
    this.searchMovie        = this.searchMovie.bind(this)
    this.showMore           = this.showMore.bind(this)
  }

  componentDidMount() {
    this.setState(this.state)
  }
  
  onChangeSearchName(evt) {
    this.state.movieName = evt.target.value
    this.setState(this.state)
  }

  async showMore() {
    this.state.isLoadingMovies = true
    this.state.page++

    this.setState(this.state)

    const query = querystring.stringify({
      title: this.state.currentSearch,
      page: this.state.page
    })
    
    const res = await axios({
      method: 'GET',
      url: `/api/search?${query}`
    })

    if (res.data.error)  {
      this.state.errorMessage    = res.data.message
      this.state.isLoadingMovies = false

      return this.setState(this.state)
    }

    this.state.isLoadingMovies = false

    if (res.data.data?.length < 1)
      this.state.showMoreDisabled = true

    this.state.movies = [...this.state.movies, ...res.data.data]

    this.setState(this.state)
  }

  async searchMovie() {
    this.state.isLoadingMovies = true
    this.state.movies          = []
    this.state.errorMessage    = ''
    this.state.currentSearch   = this.state.movieName

    this.setState(this.state)

    const query = querystring.stringify({ title: this.state.movieName })
    
    const res = await axios(
      {
        method: 'GET',
        url: `/api/search?${query}`
      }
    )

    if (res.data.error)  {
      this.state.errorMessage    = res.data.message
      this.state.isLoadingMovies = false

      return this.setState(this.state)
    }

    this.state.isLoadingMovies = false
    this.state.movies          = res.data.data

    this.setState(this.state)
  }

  render() {
    return (
      <div className='m-5'>
        <MDB.MDBContainer>
          <MDB.MDBRow>
            <MDB.MDBCol>
              <MDB.MDBCard className='rounded-0 shadow'>
                <MDB.MDBCardBody>
                  <h3>Search for your favourite movies!</h3>
                  <MDB.MDBInput
                    className='w-50'
                    label='Movie Name'
                    onChange={this.onChangeSearchName}
                  />
                  <Button
                    innerColor='#00000000'
                    innerColorOnHover='black'
                    borderColor='black'
                    borderColorOnHover='black'
                    textColor='black'
                    textColorOnHover='white'
                    mouseClick={this.searchMovie}
                  >
                    <div className='m-2'>
                      Search Movie
                    </div>  
                  </Button>

                  {this.state.isLoadingMovies ?
                    (
                      <center>
                        <div className='spinner-border text-primary' />
                        <p>Loading...</p>
                      </center>
                    ) :
                    null}

                  {this.state.errorMessage ?
                    (
                      <p className='text-danger'>
                        Error: {this.state.errorMessage}
                      </p>
                    ) :
                    null}

                  {this.state.movies?.length > 0 ?
                    (
                      <MDB.MDBRow className='justify-content-md-center m-3'>
                        {this.state.movies.map(
                          (movie, index) => (
                            <center key={index}>
                              <MDB.MDBCard className='shadow m-2'>
                                <MDB.MDBCardBody>
                                  <a
                                    href={`/movie/${movie.imdbID}`}
                                  >
                                      <img
                                        src={movie.Poster === 'N/A' ?
                                              '/images/no_poster.png' :
                                              movie.Poster}
                                        width={150}
                                        height={225}
                                        className='m-3 shadow-lg'
                                    />
                                  </a>
                                </MDB.MDBCardBody>
                                <MDB.MDBCardFooter>
                                  <p>{movie.Title}</p>
                                  <Button
                                    innerColor='#00000000'
                                    innerColorOnHover='black'
                                    borderColor='black'
                                    borderColorOnHover='black'
                                    textColor='black'
                                    textColorOnHover='white'
                                    mouseClick={() => this.props.router.push(`/movie/${movie.imdbID}`)}
                                    className='mt-2'
                                  >
                                    <div className='m-2'>
                                      View Movie
                                    </div>  
                                  </Button>
                                </MDB.MDBCardFooter>
                              </MDB.MDBCard>
                            </center>
                          )
                        )}
                      </MDB.MDBRow>
                    ) :
                    null}
                  <br />
                  <Button
                    innerColor='#00000000'
                    innerColorOnHover='black'
                    borderColor='black'
                    borderColorOnHover='black'
                    textColor='black'
                    textColorOnHover='white'
                    mouseClick={this.showMore}
                    className='mt-2'
                  >
                    <div className='m-2'>
                      Show More
                    </div>  
                  </Button>
                </MDB.MDBCardBody>
              </MDB.MDBCard>
            </MDB.MDBCol>
          </MDB.MDBRow>
        </MDB.MDBContainer>
      </div>
    )
  }
}

export default withRouter(Movies)