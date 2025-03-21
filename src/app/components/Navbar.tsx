import Image from "next/image";
import Link from "next/link";
import { AuthModal } from "./AuthModel";
import FirstSection from "./home/firstsecction/page";
import SecondSection from "./home/secondsection/page";
import Footer from "./home/footer/page";

export function Navbar() {
    return (<>
        <div className="flex justify-between items-center ml-10 mr-10 ">
            <Link href="/">
                {/* <Image src={``} alt=""/> */}
                <h1 className="text-3xl font-bold p-3.5 text-pink-400 hover:text-pink-600">&#60;SM/&#62;</h1>
            </Link>
            <AuthModal />
        </div>
        <div className="w-full ml-0 mr-0">
            <FirstSection />
        </div>

        <div className="w-full ml-0 mr-0">
            <SecondSection />
        </div>
        <div className="w-full ml-0 mr-0">
            <Footer />
        </div>
    </>)
}