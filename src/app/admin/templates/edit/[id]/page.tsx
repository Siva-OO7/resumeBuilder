// import React from 'react'
// import TemplateForm from '../../_components/template-form'
// import { getTemplateById } from '@/server-actions/templates'

// async function EditTemplate({params}: {
//   params : {
//     id : string
//   }
// }) {
//   const response = await getTemplateById(params.id);
//   if(!response.success){
//     return <div>
//       {
//         response.message
//       }
//     </div>
//   }
//   return (
//     <div>
//         <h1 className="text-xl font-bold text-[#2C1D74]">
//          Edit Template
//         </h1>
//         <TemplateForm initialValues = {response.data} type ="edit" />
//     </div>
//   )
// }

// export default EditTemplate

import { Metadata } from 'next';
import TemplateForm from '../../_components/template-form';
import { getTemplateById } from '@/server-actions/templates';

type Props = {
  params: { id: string };
};

export default async function EditTemplate({ params }: Props) {
  const response = await getTemplateById(params.id);

  if (!response.success) {
    return (
      <div className="text-red-500 font-medium">
        {response.message}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-[#2C1D74] mb-4">
        Edit Template
      </h1>
      <TemplateForm initialValues={response.data} type="edit" />
    </div>
  );
}




