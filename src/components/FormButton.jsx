export default function FormButton({ buttonText, handler }) {
  return <button onClick={() => handler()}>{buttonText}</button>;
}
