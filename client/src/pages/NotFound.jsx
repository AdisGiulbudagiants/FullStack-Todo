import NavLinkButton from "../components/NavLinkButton.jsx"
import Image from "../components/Image.jsx"
import BgImage from "../assets/cozy mountain view.jpg"

const NotFound = () => {
  return (
    <div className="relative h-screen w-full flex justify-center items-center select-none">
      <Image
        src={BgImage}
        hash="LjG[7hoeWCj@~UofayjtAvWXjsa|"
        style="absolute w-full h-screen object-cover"
      />
      <div className="absolute h-screen flex flex-col justify-center items-center z-10">
        <h1 className=" font-poppins-medium text-[128px]">
          404 This page doesn&apos;t exist
        </h1>
        <p className="font-poppins-medium text-3xl mb-5"></p>
        <NavLinkButton to="/login" text="Back to Sign In Page" />
      </div>
    </div>
  )
}

export default NotFound
