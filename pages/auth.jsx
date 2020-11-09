import { Component } from "react";
import { withRouter } from "next/router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: "",
      success: "",
      isRegister: false,
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.setState(this.state);
  }

  onChangeInput(evt) {
    const id = evt.target.id;
    this.state[id] = evt.target.value;

    this.setState(this.state);
  }

  async submit() {
    this.state.error = "";
    this.state.success = "";

    if (localStorage.getItem("SESSION_KEY")) {
      this.state.error = "You're already logged in!";
      return this.setState(this.state);
    }

    this.setState(this.state);

    const result = await axios({
      method: this.state.isRegister ? "PUT" : "POST",
      url: "/api/user",
      data: {
        username: this.state.username,
        password: this.state.password,
      },
    });

    if (result.data.status_error) {
      this.state.error = result.data.status_message;
      return this.setState(this.state);
    }

    const { key } = result.data.status_data;
    localStorage.setItem("SESSION_KEY", key);

    this.state.success = result.data.status_message;
    this.setState(this.state);

    setTimeout(() => {
      this.props.router.push("/");
    }, 2000);
  }

  render() {
    return (
      <div className="columns is-centered">
        <div className="column is-4">
          <div className="card m-6 is-radiusless">
            <div className="card-content">
              <div className="content has-text-centered">
                <h2 className="title">
                  {this.state.isRegister ? "Signup" : "Login"}
                </h2>
              </div>
              <div>
                <label>Your Username</label>
                <p className="control has-icons-left">
                  <input
                    id="username"
                    className="input is-info"
                    placeholder="Username"
                    onChange={this.onChangeInput}
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </p>
              </div>

              <div className="mt-4">
                <label>Your Password</label>
                <p className="control has-icons-left">
                  <input
                    id="password"
                    className="input is-info"
                    type="password"
                    placeholder="Password"
                    onChange={this.onChangeInput}
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                </p>
              </div>

              <div className="mt-4">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    onChange={() =>
                      this.setState({
                        isRegister: !this.state.isRegister,
                      })
                    }
                  />
                  Don't have an account?
                </label>
              </div>

              <div className="mt-3 has-text-centered">
                <button
                  onClick={this.submit}
                  className="is-radiusless button is-black"
                >
                  {this.state.isRegister ? "Signup" : "Login"}
                </button>
                <p className="has-text-danger">{this.state.error}</p>
                {this.state.success ? (
                  <p className="has-text-primary">
                    {this.state.success + " Redirecting..."}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Auth);
