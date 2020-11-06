import { Component } from 'react'

class Button extends Component {
  constructor(props) {
    super(props)

    this.props = props
    this.state = {
      borderColor: this.props.borderColor,
      textColor: this.props.textColor,
      innerColor: this.props.innerColor,
    }

    this.mouseEntered = this.mouseEntered.bind(this)
    this.mouseLeft    = this.mouseLeft.bind(this)
    this.mouseClick   = this.mouseClick.bind(this)
  }

  mouseEntered(evt) {
    if (typeof this.props.onMouseEnter === 'function')
      this.props.mouseEntered(evt)

    this.state.borderColor = this.props.borderColorOnHover
    this.state.textColor   = this.props.textColorOnHover
    this.state.innerColor  = this.props.innerColorOnHover

    this.setState(this.state)
  }

  mouseLeft(evt) {
    if (typeof this.props.onMouseLeave === 'function')
      this.props.mouseLeft(evt)

    this.state.borderColor = this.props.borderColor
    this.state.textColor   = this.props.textColor
    this.state.innerColor  = this.props.innerColor

    this.setState(this.state)
  }

  mouseClick(evt) {
    evt.preventDefault()

    if (typeof this.props.mouseClick === 'function')
      this.props.mouseClick(evt)

    setTimeout(
      () => {
        this.state.borderColor = this.props.borderColor
        this.state.textColor   = this.props.textColor
        this.state.innerColor  = this.props.innerColor

        this.setState(this.state)
      },
      150
    )
  }

  componentDidMount() {
    this.setState(this.state)
  }

  render() {
    return (
      <button
        style={
          {
            transition: '.3s',
            border: `2px solid ${this.state.borderColor}`,
            color: this.state.textColor,
            backgroundColor: this.state.innerColor,
            outline: 'none',
            backgroundImage: this.props.bgImage || 'none',
            ...this.props.style
          }
        }

        onMouseEnter={this.mouseEntered}
        onMouseLeave={this.mouseLeft}
        onClick={this.mouseClick}
        className={this.props.className || ''}
      >
        {this.props.children || null}
      </button>
    )
  }
}

export default Button