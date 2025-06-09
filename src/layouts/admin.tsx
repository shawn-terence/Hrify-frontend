

import  Navbaradm  from "../components/navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col  h-screen">
      <Navbaradm />

      <main id="mainCont" className="container   mx-auto lg:mx-36   border shadow-lg rounded-xl mt-10 max-w-7xl px-6  flex-grow pt-8 pb-8" >
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
      <p className="text-lg font-bold text-gray-500">Hrify 2025</p>
      </footer>
    </div>
  );
}
