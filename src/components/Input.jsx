function Input({ type, id, htmlFor }) {
  return (
    <section className="center">
      <input type={type} id={id} hidden />
      <label htmlFor={htmlFor} className="btn-upload">
        Upload
      </label>
    </section>
  );
}

export default Input;
