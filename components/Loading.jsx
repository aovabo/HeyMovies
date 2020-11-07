const Loading = (props) => (
  <div className="has-text-centered">
    <button
      style={{
        backgroundColor: "rgb(0, 0, 0, 0.0)",
        border: "none",
        fontSize: "50px",
      }}
      className="button is-centered is-large is-radiusless is-shadowless is-loading"
    />
    <p
      className={`subtitle is-text-centered has-text-${
        props.inverted ? "black" : "white"
      }`}
    >
      Loading...
    </p>
  </div>
);

export default Loading;
