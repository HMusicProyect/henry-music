import Link from 'next/link';
import React from 'react';

interface FooterProps {
  companyName: string;
  year: number;
}

const Footer: React.FC<FooterProps> = ({ companyName, year }) => {
  return (


	<footer className="bg-black rounded-lg shadow dark:bg-gray-900 m-4">
	<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
	  <div className="sm:flex sm:items-center sm:justify-between">
		<a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
		  <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">H music</span> 
		  <p className="disco ml-2">📀</p>
		</a>
		<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
		
	
	<Link href={'/about'}>
	<button className="group group-hover:before:duration-500 group-hover:after:duration-1000 after:duration-500 hover:border-yellow-300 duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-2 hover:before:top-8 hover:before:right-16 hover:after:scale-150 hover:after:blur-none hover:before:-bottom-8 hover:before:blur-none hover:bg-black hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-yellow-900 relative bg-black h-16 w-64 border text-left p-3 text-yellow-500 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-yellow-400 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-yellow-600 after:right-8 after:top-3 after:rounded-full after:blur">
  Sobre Nosotros
</button>
	</Link>
		

  

		</ul>
	  </div>
	  <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	  <span className="block text-sm text-white sm:text-center dark:text-gray-400">© {year} <a href="https://flowbite.com/" className="hover:underline">{companyName}</a>. All Rights Reserved.</span>
	</div>
  </footer>


  );
}

export default Footer;