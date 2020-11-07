import { Component } from "react";
import axios from "axios";
import Loading from "../../components/Loading";

class Movie extends Component {
  state = {
    movie: null,
    hasLoaded: false,
    error: "",
  };

  async componentDidMount() {
    const response = await axios({
      method: "GET",
      url: `/api/movie/${this.props.id}`,
    });

    this.state.hasLoaded = true;

    if (response.data.status_error) {
      this.state.error = response.data.status_message;
      return this.setState(this.state);
    }

    this.state.movie = response.data.status_data;
    console.log(this.state.movie);
    this.setState(this.state);
  }

  render() {
    return (
      <div className="container">
        <article className="media has-background-white m-4">
          {this.state.hasLoaded ? (
            <div className="media-content">
              <div className="has-text-centered m-3">
                <img
                  src={`https://image.tmdb.org/t/p/original${this.state.movie.poster_path}`}
                  width={150}
                  height={225}
                />
                <p className="title is-size-4">
                  {this.state.movie.title}
                  <p className="subtitle is-6">
                    By:{" "}
                    {this.state.movie.production_companies
                      .map((prod) => prod.name)
                      .join(", ")}
                  </p>
                  <p className="subtitle is-6">Nominations: 0</p>
                </p>
                <div>
                  {this.state.movie.adult ? (
                    <span className="tag is-danger ml-1">Adult</span>
                  ) : (
                    <span className="tag is-primary ml-1">Kids</span>
                  )}
                  {this.state.movie.genres.map((genre, index) => (
                    <span key={index} className="tag is-primary ml-1">
                      {genre.name}
                    </span>
                  ))}
                </div>
                <p className="subtitle is-6">{this.state.movie.tagline}</p>

                <hr className="mx-6 has-background-grey" />

                <div className="columns is-centered">
                  <div className="column is-half">
                    <p>{this.state.movie.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-5 mb-5 media-content">
              <Loading inverted />
            </div>
          )}
        </article>
      </div>
    );
  }
}

Movie.getInitialProps = (ctx) => ({
  id: ctx.query.id,
});

export default Movie;
