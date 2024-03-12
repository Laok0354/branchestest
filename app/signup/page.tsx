import Link from "next/link";
import Image from "next/image";

import { SignUpForm } from "../../components/Forms";

export default function Signup() {
  return (    
    <main className="bg-gradient-to-br from-primaryv to-80% to-black flex items-center justify-around h-screen">
      <div className="flex flex-col align-middle justify-center">
        <Image
          src={"/img/StartApp-Logo-lg.png"}
          width={400}
          height={200}
          alt="Picture of the author"
        />
        <h2 className="text-3xl font-medium tracking-wide font-raleway ml-16">
          Develop Your Dreams
        </h2>
      </div>
      <article className="bg-gray-800 border-2 border-primaryv py-6 px-16 rounded-lg shadow-2xl mt-8 mb-8 ">
        <section className="flex flex-col justify-center align-middle">
          <div className="flex flex-col float-left align-middle mb-6 font-raleway">
            <h2 className="font-medium text-3xl tracking-wide">Sign Up</h2>
            <h6 className="text-gray-50">
              Already have an account?
              <span className="mx-1 text-blue">
                <Link href="/login">Login</Link>
              </span>
            </h6>
          </div>
          <div className="flex justify-center items-center">
            <SignUpForm />
          </div>
        </section>
      </article>
    </main>
  );
}
