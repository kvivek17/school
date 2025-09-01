import Link from "next/link";


export default async function Page() {
 
  return (
    <>
     <section className='grid grid-cols-1  md:grid-cols-2 min-h-[100vh]'>
            <div className='bg-blue-800 items-center flex justify-center flex-col gap-10'>
                <h2 className='text-4xl font-bold text-white w-[50%]'>
                    <button className='bg-white text-blue-800 px-4 py-2 rounded-lg hover:bg-gray-200'>
               <Link href="/addschool">Add School</Link>
                    </button>
                </h2>
               </div>
    
         
                 <div className='bg-white items-center flex justify-center flex-col gap-10'>
                <h2 className='text-4xl font-bold text-black w-[50%]'>
                   <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-gray-200'>
               <Link href="/getschool"> Show School</Link>
                    </button>
                </h2>
               </div>   
           
    
        </section>
       
        </>
  )
}