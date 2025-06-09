

import  Navbar  from "../components/navbarr";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col  h-screen">
      <Navbar />
      <main id="mainCont" className="container  self-center mx-auto lg:mx-36   border shadow-lg rounded-xl mt-10 max-w-7xl px-6  flex-grow pt-8 pb-8" >
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <p className="text-lg font-bold text-gray-500">Hrify 2024</p>
      </footer>
    </div>
  );
}
