// "use client" 
// import React from 'react'
// import { Navbar } from './Navbar'
// import { TemplateGallery } from './template-gallery'
// import { usePaginatedQuery } from 'convex/react'
// import { api } from '@/convex/_generated/api'
// import { DocumentTable } from './document-table'
// import { useSearchParam } from '../hooks/use-search-param'

// const HomePage = () => {
//   const [search] = useSearchParam()

//   const {results,status, loadMore} = usePaginatedQuery(api.documents.getDocuments, {search},{initialNumItems:5})

//   if(results === undefined){
//     return(
//       <p>Loading ...</p>
//     )
//   }
//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-8">
//         <Navbar />
//       </div>
//       {/* <div className="mt-16">
//         Click <Link href="/documents/123">
//           <span className="•text-blue-500 underline">&nbsp;here&nbsp; </span>
//         </Link> to go to document id
//       </div> */}

// <div className="mt-16">
//   <TemplateGallery />
//   <DocumentTable 
//     documents={results} 
//     loadMore={loadMore} 
//     status={status}
//   />
// </div>
//     </div>

//   )
// }

// export default HomePage


'use client'
import React from 'react';
import { Navbar } from './Navbar';
import { TemplateGallery } from './template-gallery';
import { usePaginatedQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { DocumentTable } from './document-table';
import { useSearchParams } from 'next/navigation';

const HomePage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.getDocuments,
    { search },
    { initialNumItems: 5 }
  );

  if (!results) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-8">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentTable documents={results} loadMore={loadMore} status={status} />
      </div>
    </div>
  );
};

export default HomePage;
