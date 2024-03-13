"use client";
import Image from 'next/image'
import {useState} from 'react'
import Link from 'next/link'

const User = (
    {
        id,
        imageDir,
        userName,
        userUrl,
        project,
    } : {
        id: number
        imageDir: string
        userName: string
        userUrl: string
        project: string
    }) => {

        
    return(
        <section className='flex flex-row items-center mb-4 mt-4 w-full justify-center px-6 py-2'>
            <div>
            <Link href="../../app/profile">
                <Image
                    src={imageDir}
                    alt="Picture of the author"
                    width={45}
                    height={45}
                    className='rounded-full cursor-pointer'
                    />  
                </Link>
            </div>
            <div className='flex flex-row justify-around items-center w-full'>
                <a className='hover:underline hover:text-[#BE71EB] transition-all text-sm' href={userUrl}>{userName}</a>
                <div className='flex items-center flex-col'>   
                    <h2 className=' text-orange font-bold'>Popular Project</h2>
                    <a className='transition-all text-sm'>{project}</a>
                </div>           
            </div>
        </section>
    )       
}

export default User;