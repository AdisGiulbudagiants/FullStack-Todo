/* eslint-disable react/prop-types */
const Input = ({ style, icon, onChange, placeholder, type }) => {
  return (
    <div className="flex justify-center items-center gap-1 mb-2 font-poppins-light">
      <input
        onChange={onChange}
        className={`${style} p-1 rounded-lg border bg-transparent outline-none`}
        type={type}
        placeholder={placeholder}
        required
      />
      {icon}
    </div>
  )
}

export default Input
