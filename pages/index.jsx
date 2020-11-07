import axios from "axios";
import { Component } from "react";
import Link from "next/link";
import Loading from "../components/Loading";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      cursor: "default",
    };

    this.mouseEnterImage = this.mouseEnterImage.bind(this);
    this.mouseLeaveImage = this.mouseLeaveImage.bind(this);
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

    setTimeout(() => {
      this.state.movies = result.data.status_data.results.slice(0, 5);
      this.setState(this.state);
    }, 2000);
  }

  render() {
    return (
      <div>
        <section className="hero is-medium text-white is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title has-text-white">Site Name</h1>
              <h2 className="subtitle has-text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                consectetur, leo a semper molestie, quam lorem porta urna, et
                blandit ipsum sem at nibh. Donec velit nisl, congue eu bibendum
                nec, maximus id felis. Suspendisse risus justo, laoreet non
                commodo porta, eleifend quis velit. Sed nisi diam, consequat
                placerat libero nec, elementum commodo leo. Proin vestibulum
                tortor eros, non venenatis lorem scelerisque non. Vestibulum
                consequat augue non orci scelerisque scelerisque. Vivamus
                scelerisque pellentesque ex in mollis. Pellentesque scelerisque
                ut tellus ac hendrerit. Praesent eros odio, sollicitudin eget
                justo a, sagittis pellentesque elit. In viverra, urna a finibus
                porta, velit lectus facilisis dui, sit amet hendrerit turpis
                lorem ut leo. Integer consectetur egestas magna at euismod.
              </h2>
            </div>
          </div>
        </section>

        <div className="container">
          <hr />
        </div>

        <section>
          <div className="has-text-centered">
            <h1 className="title has-text-white">5 Most Popular Movies</h1>
            {this.state.movies.length < 1 ? (
              <Loading />
            ) : (
              <div>
                {this.state.movies.map((movie, index) => (
                  <Link key={index} href={`/movie/${movie.id}`}>
                    <img
                      style={{
                        cursor: this.state.cursor,
                      }}
                      onMouseEnter={this.mouseEnterImage}
                      onMouseLeave={this.mouseLeaveImage}
                      className="mx-3 mb-3"
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      width={150}
                      height={225}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default Index;
