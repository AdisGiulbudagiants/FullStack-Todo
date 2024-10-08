import Marquee from "react-fast-marquee"
import NavLinkButton from "../components/NavLinkButton.jsx"
import Image from "../components/Image.jsx"
import BgImage from "../assets/cozy mountain view.jpg"

const NotFound = () => {
  return (
    <>
      <Image
        src={BgImage}
        hash="LjG[7hoeWCj@~UofayjtAvWXjsa|"
        style="absolute w-full h-screen object-cover"
      />
      <div className="realtive h-screen w-full flex flex-col justify-center select-none">
        <div className="aboslute flex flex-col justify-center items-center z-10">
          <Marquee
            speed={200}
            className="flex font-poppins-medium text-[150px]">
            - 404 - 404 - 404 - 404 - 404
          </Marquee>
          <NavLinkButton to="/login" text="Back to Sign In Page" />
          <Marquee
            speed={200}
            direction="right"
            className="flex font-poppins-medium text-[150px]">
            - NOT FOUND - NOT FOUND - NOT FOUND - NOT FOUND
          </Marquee>
        </div>
      </div>
    </>
  )
}

export default NotFound
