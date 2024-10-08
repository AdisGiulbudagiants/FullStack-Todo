/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

const NavLinkButton = ({ text, to, style }) => {
  return (
    <motion.button
      className={`${style} border-2 border-black p-2 font-poppins-medium text-lg`}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 0px 4px rgb(0,0,0)",
        color: "#fff",
        rotate: 2,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      <NavLink to={to}>{text}</NavLink>
    </motion.button>
  )
}

export default NavLinkButton
