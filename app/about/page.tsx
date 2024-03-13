import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Home () {
    return (
      <>
      <header>
        <Navbar page="About"/>
      </header>
      <main>
        <section className="pl-24 bg-gradient-to-br from-black from-50% to-primaryv w-full h-[full]">
        <div className="pt-52 text-[25px] font-semibold font-red">
        <h2>Why did we decide to develop StartApp?</h2>
      </div>
      <div className="pb-52 text-[20px] pr-[450px]">
        <p>The main objective of StartApp is to connect people who have ideas to be accomplished with the indicated people to carry it out. 
We are a team of high school students with the desire to create the best website to connect people with startups. We are a platform to form optimal workspaces. Allowing our users to expose their skills, experiences and intentions in a concise, efficient and original way.</p>
      </div>
      <div className="pt-52 text-[25px] font-semibold font-red">
        <h2>Our main pillars!</h2>
      </div>
      <div className="pb-52 text-[20px] pr-[450px]">
        <p>Entrepreneurship, money, youth, ambition, business management, people connection, personal, group and business projects, personal and group development, startups.</p>
      </div>
        </section>
      <Footer/>

      </main>
      </>
    )
}