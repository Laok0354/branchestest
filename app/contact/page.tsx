import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Contact () {
    return(
        <>
        <header>
        <Navbar page="Contact & Terms"/>
        </header>

        <main>
         <section className="pl-24 bg-gradient-to-br from-black from-50% to-primaryv w-full h-[full]">
          <div>
            <h2 className="text-[25px] pt-52 font-semibold font-red">Contact</h2>
          </div>

          <div className="pb-10 text-[20px] pr-[450px]">
           <p>Contact us to let us know what you like about us or if you have any issues using the website. 
We will be pleased to respond to you by email or on any of our social media channels:</p>
          </div>

        <div className=" flex w-full justify-start">
          <div className=" pt-10 pr-10">
          <Link href="https://x.com/StartAppOficial?t=d3_QjjqROU-3lxJVb-noUQ&s=08">
            <Image className= 'w-[70px] h-[70px]'
            src="/svg/x.svg"
            alt=""
            width = {200}
            height= {100}
          /></Link>
          </div>
          <div className=" pt-10 pr-10">
          <Link href="https://instagram.com/startapp.oficial?igshid=MTNiYzNiMzkwZA==">
            <Image className= 'w-[70px] h-[70px]'
            src="/svg/Ig.svg"
            alt=""
            width = {200}
            height= {100}
          /></Link>
          </div>
        </div>

        <div>
            <h2 className="text-[25px] pt-40 font-semibold font-red">Terms</h2>
          </div>
        <div className="pb-20 text-[20px] pr-[450px]">
           <p>
Welcome to Startapp! By using our platform, you agree to adhere to our user agreement, confirming your eligibility to participate. We encourage responsible use, respecting others' intellectual property and privacy. To submit a project, provide a title, description, images, and member list. Collaborate respectfully, customize your profile, and understand the ownership of intellectual property. Your data is handled in line with our privacy policy, and we employ security measures to safeguard information. Account termination, dispute resolution, and any updates to terms will be communicated transparently. We're here to help—reach out for support or questions. Join us in fostering innovation and entrepreneurship responsibly.</p>
          </div>
         </section>
         <Footer/>
        </main>
        </>
    )
}
