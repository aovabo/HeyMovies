import axios from "axios";
import { Component } from "react";
import Link from "next/link";
import Loading from "../components/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      cursor: "default",
      searchedMovies: [],
      isSearching: false,
      searchInput: "",
      searchError: "",
      nominatedMovies: [],
      isWaitingForNominations: true,
    };

    this.mouseEnterImage = this.mouseEnterImage.bind(this);
    this.mouseLeaveImage = this.mouseLeaveImage.bind(this);
    this.search = this.search.bind(this);
  }

  mouseEnterImage() {
    this.state.cursor = "pointer";
    this.setState(this.state);
  }

  mouseLeaveImage() {
    this.state.cursor = "default";
    this.setState(this.state);
  }

  async componentDidMount() {
    this.setState(this.state);

    const result = await axios({
      method: "GET",
      url: "/api/movies/popular",
    });

    this.state.movies = result.data.status_data.results.slice(0, 5);
    this.setState(this.state);

    const nominations = await axios({
      method: "GET",
      url: "/api/movies/nominations",
    });

    this.state.nominatedMovies = nominations.data.status_data.filter(
      (movie) => movie.nominations > 0
    );
    this.state.isWaitingForNominations = false;

    this.setState(this.state);
  }

  async search() {
    this.state.isSearching = true;
    this.state.searchError = "";
    this.state.searchedMovies = [];

    this.setState(this.state);

    const movieToSearch = this.state.searchInput;
    const result = await axios({
      method: "POST",
      url: "/api/movies/search",
      data: {
        title: movieToSearch,
      },
    });

    this.state.isSearching = false;

    if (result.data.status_error) {
      this.state.searchError = result.data.status_message;
      return this.setState(this.state);
    }

    this.state.searchedMovies = result.data.status_data.results;
    this.setState(this.state);
  }

  render() {
    return (
      <div className="mb-5">
        <div className="columns is-centered">
          <div className="column is-6">
            <section className="hero is-medium text-white is-bold">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h1 className="title has-text-white">Hey Movies</h1>
                  <h2 className="subtitle has-text-white">
                    A simple and easy to use Website for searching movies, and
                    showing the top 5 most popular ones. HeyMovies also provide
                    a nomination system for users to nominate their liked movie.
                  </h2>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="container">
          <hr />
        </div>
        <section>
          <div className="has-text-centered">
            <h1 className="title has-text-white">5 Most Popular Movies</h1>
            {this.state.movies.length < 1 ? (
              <Loading />
            ) : (
              <div className="columns is-multiline is-centered">
                {this.state.movies.map((movie, index) => (
                  <center>
                    <div
                      key={index}
                      style={{ width: "150px" }}
                      className="column is-one-fifth"
                    >
                      <Link href={`/movie/${movie.id}`}>
                        <img
                          style={{
                            cursor: this.state.cursor,
                          }}
                          onMouseEnter={this.mouseEnterImage}
                          onMouseLeave={this.mouseLeaveImage}
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          width={150}
                          height={225}
                        />
                      </Link>
                      <p
                        style={{
                          maxWidth: "150px",
                        }}
                        className="has-text-white"
                      >
                        {movie.title}
                      </p>
                    </div>
                  </center>
                ))}
              </div>
            )}
          </div>
        </section>
        <div className="container">
          <hr />
        </div>
        <section>
          <div className="has-text-centered">
            <h1 className="title has-text-white">Top 5 Nominated Movies</h1>
            {this.state.isWaitingForNominations ? (
              <Loading />
            ) : (
              <div className="columns is-multiline is-centered">
                {this.state.nominatedMovies.length < 1 ? (
                  <p className="subtitle is-5 has-text-white">
                    There are currently no nominated movies.
                  </p>
                ) : (
                  this.state.nominatedMovies.map((movie, index) => (
                    <center>
                      <div
                        key={index}
                        style={{ width: "150px" }}
                        className="column is-one-fifth"
                      >
                        <Link href={`/movie/${movie.id}`}>
                          <img
                            style={{
                              cursor: this.state.cursor,
                            }}
                            onMouseEnter={this.mouseEnterImage}
                            onMouseLeave={this.mouseLeaveImage}
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            width={150}
                            height={225}
                          />
                        </Link>
                        <p
                          style={{
                            maxWidth: "150px",
                          }}
                          className="has-text-white"
                        >
                          {movie.title} ({movie.nominations.toLocaleString()})
                        </p>
                      </div>
                    </center>
                  ))
                )}
              </div>
            )}
          </div>
        </section>
        <div className="container">
          <hr />
        </div>
        <section>
          <h2 className="title has-text-white has-text-centered">
            Search for Movies
          </h2>
          <div className="columns is-centered">
            <div className="column is-one-third">
              <p className="control has-icons-left mx-3">
                <input
                  onChange={(evt) =>
                    this.setState({ searchInput: evt.target.value })
                  }
                  className="input"
                  type="name"
                  placeholder="Movie Name"
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </p>
            </div>
          </div>
          <center>
            <div className="mb-3">
              <div className="mb-5">
                {this.state.isSearching ? <Loading /> : null}
              </div>

              {this.state.searchedMovies ? (
                <div className="columns is-multiline is-centered">
                  {this.state.searchedMovies.map((movie, index) => (
                    <>
                      <div
                        style={{
                          cursor: this.state.cursor,
                          width: "150px",
                        }}
                        key={index}
                        className="column is-one-fifth"
                      >
                        <Link href={`/movie/${movie.id}`}>
                          <img
                            onMouseEnter={this.mouseEnterImage}
                            onMouseLeave={this.mouseLeaveImage}
                            src={
                              movie.poster_path
                                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                : "/images/no_poster.png"
                            }
                            width={150}
                            height={225}
                          />
                        </Link>
                        <p
                          style={{
                            maxWidth: "150px",
                          }}
                          className="has-text-white"
                        >
                          {`${movie.title} (${
                            movie.release_date.split("-")[0]
                          })`}
                        </p>
                      </div>
                    </>
                  ))}
                </div>
              ) : null}

              {this.state.searchError ? (
                <p className="has-text-danger">{this.state.searchError}</p>
              ) : null}
            </div>
            <button
              className="button is-white is-radiusless"
              onClick={this.search}
            >
              Search
            </button>
          </center>
        </section>
      </div>
    );
  }
}

export default Index;
