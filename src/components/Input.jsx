import "./input.css";

export default function Input({
  name,
  id,
  placeholder,
  label,
  type,
  onChange,
  error = "",
}) {
  return (
    <div>
      <label htmlFor={id} className="labels">
        {label}
      </label>
      <input
        name={name}
        id={id}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
      {error !== "" ? <label className="error">{error}</label> : null}
    </div>
  );
}
