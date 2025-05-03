// import { getTemplateById } from '@/server-actions/templates'
// import React from 'react'
// import Resume from '../_components/resume'


// async function TemplatePreview( {params} : {
//     params : {
//         id: string;
//     };
//   }
// ) {

//   const {id} = params;

//     const response = await getTemplateById(id);
//   return (
//     <div>
//       <Resume template={response.data} />
//     </div>
//   )
// }

// export default TemplatePreview

// import { getTemplateById } from '@/server-actions/templates'
// import React from 'react'
// import Resume from '../_components/resume'

// interface PageProps {
//   params: {
//     id: string;
//   };
// }

// async function TemplatePreview({ params }: PageProps) {
//   // params is already an object, no need to await
//   const { id } = params; 

//   const response = await getTemplateById(id);
  
//   return (
//     <div>
//       <Resume template={response.data} />
//     </div>
//   );
// }

// export default TemplatePreview;

import { getTemplateById } from '@/server-actions/templates'
import Resume from '../_components/resume'

interface PageProps {
  params: {
    id: string;
  };
}

async function TemplatePreview({ params }: PageProps) {
  // First await the params object
  const { id } = await Promise.resolve(params);
  
  // Then use the id in your data fetching
  const response = await getTemplateById(id);

  return (
    <div>
      <Resume template={response.data} />
    </div>
  );
}

export default TemplatePreview;
