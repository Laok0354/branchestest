import Link from "next/link";
import Image from "next/image";
import NavBar from "../components/NavBar";
import ScrollButton from "@/components/ScrollButton";
import Footer from "@/components/Footer";


export default function Home () {
  return (
    <main id="__next">
    <header><NavBar page="Home"/></header>
    <section className="pl-24 bg-gradient-to-br from-black from-50% to-primaryv w-full h-[full]">
      <h1 className="pt-[184px] mb-[27px] flex flex-col w-[838px]text-white text-[70px] justify-center font-semibold text-7xl font-red">Build your own team project</h1>
      <div>
      <p className="mb-[47px] w-[829px] h-[80px] text-white text-[30px]">Connect ideas with people to create starups and unique entrepeneurships.</p>
      </div>

      <div className="flex itemx-center gap-2">
          <button className="text-black w-[170px] h-[55px] rounded-[35px] flex justify-center items-center bg-primaryv hover:bg-primaryv/70 active:bg-primaryv/30">
           <Link className="text-[22px] text-center my-4 mx-6" href="/signup">Get Started</Link>
          </button>
          <ScrollButton/>
      </div>

      <div className="pt-80 text-[25px] font-semibold font-red">
        <h2>Connect with Startups of your interest!</h2>
      </div>
      <div className="text-[20px] pr-[450px]">
        <p>Startapp aims to connect people with projects and vice versa. It is an exclusive platform to share your experience and skills with the world of entrepreneurship.</p>
      </div>
      <div className="pt-40 text-[25px] font-semibold font-red">
        <h2>Upload your idea!</h2>
      </div>
      <div className="text-[20px] pr-[450px]">
        <p>We have a space for you to upload a project you have in mind, composed by a title, a description, images and a section with the list of members of the project, where you could see if there is room for more collaborators or not, what kind of people are needed and what kind of collaborators are already working on.</p>
      </div>
      <div className="flex">
        <Image className='w-[1000px] h-[1000px]'
               src="/svg/createidea.svg"
               alt=""
               width = {200}
               height= {100}
        />
      </div>
      <div className="text-[25px] font-semibold font-red">
        <h2>Customize your profile!</h2>
      </div>
      <div className="text-[20px] pr-[450px]">
        <p>Each user has their own space to share their work and knowledge, exposing projects in which they are collaborating at the moment. You can send a request to different users to participate in your project or startup.</p>
      </div>
      <div className="flex">
        <Image className='w-[1000px] h-[1000px]'
               src="/svg/profileedit.svg"
               alt=""
               width = {200}
               height= {100}
        />
      </div>
      <div className="text-[25px] font-semibold font-red">
        <h2>Feeds</h2>
      </div>
      <div className="text-[20px] pr-[450px]">
        <p>We have two feeds, one to find projects and one to find people to build your team, both equipped with recommendation algorithms based on your interests.
We have an AI that allows the user's search to be successful. Matching projects with users.</p>
      </div>
      <div className="flex">
        <Image className='w-[1000px] h-[1000px]'
               src="/svg/twofeeds.svg"
               alt=""
               width = {200}
               height= {100}
        />
      </div>
     </section>
     <Footer/>
    
    </main>
  )
}
