import { Component } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { withRouter } from "next/router";

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: null,
      hasLoaded: false,
      error: "",
      success: "",
    };

    this.onNominate = this.onNominate.bind(this);
  }

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
    this.setState(this.state);
  }

  async onNominate(type) {
    this.state.error = "";
    this.state.success = "";

    this.setState(this.state);

    const sessionKey = localStorage.getItem("SESSION_KEY");
    if (!sessionKey) {
      this.state.error = "Not logged in. Redirecting to auth page...";
      this.setState(this.state);

      return setTimeout(() => {
        this.props.router.push("/auth");
      }, 2000);
    }

    const result = await axios({
      method: type === "DEL" ? "DELETE" : "POST",
      url: `/api/movie/nominate`,
      headers: {
        Authorization: `Auth ${sessionKey}`,
      },
      data: {
        movie: this.state.movie.id,
      },
    });

    if (result.data.status_remove_key) {
      localStorage.removeItem("SESSION_KEY");

      this.state.error =
        result.data.status_message + " Redirecting to auth page...";
      this.setState(this.state);

      return setTimeout(() => {
        this.props.router.push("/auth");
      }, 2000);
    }

    if (result.data.status_error) {
      this.state.error = result.data.status_message;
      return this.setState(this.state);
    }

    this.state.success = result.data.status_message;
    this.state.movie.nominations = result.data.status_data.nominations;

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
                <div className="title is-size-4">
                  {this.state.movie.title}
                  <div className="subtitle is-6">
                    By:{" "}
                    {this.state.movie.production_companies
                      .map((prod) => prod.name)
                      .join(", ")}
                    <div className="subtitle is-6">
                      Nominations:{" "}
                      <strong>{this.state.movie.nominations || 0}</strong>
                    </div>
                    <div className="columns is-centered">
                      <div className="column is-one-fifth">
                        <p>Average Vote: {this.state.movie.vote_average}/10</p>
                        <progress
                          className="progress is-success"
                          value={this.state.movie.vote_average}
                          max="10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
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

                <hr className="mx-6 my-2 has-background-grey" />
                <button
                  onClick={this.onNominate}
                  className="mb-2 button is-dark is-radiusless"
                >
                  Nominate this Movie
                </button>
                <button
                  onClick={() => this.onNominate("DEL")}
                  className="ml-2 button is-dark is-radiusless"
                >
                  Remove from Nomination
                </button>
                <p className="has-text-danger">{this.state.error}</p>
                <p className="has-text-primary">{this.state.success}</p>
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

export default withRouter(Movie);
