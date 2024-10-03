/* eslint-disable react/prop-types */
const Button = ({ text, style, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${style} flex mx-auto mt-2 p-3 border-2`}
      type={type}>
      {text}
    </button>
  )
}

export default Button
