import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "../../components/Forms";
import Icons from "../../components/sign-up/Icons";

export default function login() {
  return (
    <main className="bg-gradient-to-br from-primaryv to-80% to-black flex justify-around h-screen items-center">
      <div className="ml-24 flex flex-col align-middle justify-center">
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
      <article className="bg-gray-800 border-2 border-primaryv p-6 px-10 rounded-lg shadow-2xl items-center">
        <section className="flex flex-col justify-center align-middle">
          <div className="flex flex-col float-left align-middle mb-6 font-raleway">
            <Image
              src="/img/StartApp-Logo-sm.png"
              width={65}
              height={65}
              alt="Picture of the author"
              className="ml-96"
            />
            <h2 className="font-medium text-3xl tracking-wide">Login</h2>
            <h6 className="text-gray-50">
              Want to Create an Account?
              <span className="mx-1 text-blue">
                <Link href="/signup">Sign Up</Link>
              </span>
            </h6>
          </div>
          <div className="flex mt-2 flex-col justify-center align-middle mx-8">
            <LoginForm />
          </div>
        </section>
      </article>
    </main>
  );
}
