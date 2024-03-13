import Image from "next/image";

const Icons = () => {
    return (
    <section className="flex flex-row justify-center">
        <Image
            src={"/svg/apple.svg"}
            width={30}
            height={30}
            alt="Picture of the author"
            className="cursor-pointer"
        />
        <Image
            src={"/svg/google.svg"}
            width={30}
            height={30}            
            alt="Picture of the author"
            className="mx-6 cursor-pointer"
        />
        <Image
            src={"/svg/facebook.svg"}
            width={30}
            height={30}
            alt="Picture of the author"
            className="cursor-pointer"
        />
    </section>
    )
}

export default Icons;