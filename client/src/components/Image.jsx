/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { Blurhash } from "react-blurhash"

const Image = ({ src, style, alt, hash }) => {
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const img = new window.Image()
    img.onload = () => setImgLoaded(true)
    img.src = src
  }, [src])

  return (
    <>
      {!imgLoaded && (
        <Blurhash
          hash={hash}
          width={window.innerWidth}
          height={window.innerHeight}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      {imgLoaded && (
        <img src={src} className={`${style}`} loading="lazy" alt={alt} />
      )}
    </>
  )
}

export default Image
