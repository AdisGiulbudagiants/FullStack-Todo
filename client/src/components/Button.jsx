/* eslint-disable react/prop-types */
import { motion } from "framer-motion"

const Button = ({ text, style, type, disabled }) => {
  return (
    <motion.button
      disabled={disabled}
      className={`${style} flex mx-auto mt-2 p-3 border-2`}
      type={type}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 0px 4px rgb(255,255,255)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}>
      {text}
    </motion.button>
  )
}

export default Button
