/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"

const NavLinkButton = ({ text, to, style }) => {
  return (
    <button
      className={`${style} border-2 border-black p-2 font-poppins-medium text-lg`}>
      <NavLink to={to}>{text}</NavLink>
    </button>
  )
}

export default NavLinkButton
