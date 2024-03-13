import Link from "next/link";
import Image from "next/image";

function Footer () {
    return(
    <footer className="bg-black w-full relative flex flex-row shadow-2xl">
       <ul>
          <li className="pl-10 pt-10 pb-5 ml-2 text-white/70 hover:text-white active:text-white/30"><Link href="/contact">Contact & Terms</Link></li>
          <li className="pl-10 pb-5 ml-2 text-white/70 hover:text-white active:text-white/30"><Link href="/about">About</Link></li>
          <li className="pl-10 pb-5 ml-2 text-white/70 hover:text-white active:text-white/30"><Link href="/projects">Projects</Link></li>
          <li className="pl-10 pb-10 ml-2 text-white/70 hover:text-white active:text-white/30"><Link href="/">Home</Link></li>
       </ul>

      <div className="relative flex w-full justify-end">
        <div className="relative flex left-44">
         <Image className= 'w-[40px] h-[40px] mt-8'
            src="/svg/StartAppS.svg"
            alt=""
            width = {200}
            height= {100}
          />
         <h4 className="top-2 pt-10 pl-2">Ⓡ 2023 StartApp, Inc.</h4>
        </div>
        <div className="relative pt-48 pr-10">
          
        </div>
        <div className="relative pt-48 pr-10">
          <Link href="https://instagram.com/startapp.oficial?igshid=MTNiYzNiMzkwZA==">
            <Image className= 'w-[30px] h-[30px]'
            src="/svg/Ig.svg"
            alt=""
            width = {200}
            height= {100}
          /></Link>
        </div>
        <div className="relative pt-48 pr-14">
          <Link href="https://x.com/StartAppOficial?t=d3_QjjqROU-3lxJVb-noUQ&s=08">
            <Image className= 'w-[30px] h-[30px]'
            src="/svg/x.svg"
            alt=""
            width = {200}
            height= {100}
          /></Link>
        </div>
       </div>
     </footer>
    )
}

export default Footer;