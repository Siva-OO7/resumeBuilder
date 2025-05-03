"use client";

// import { ITemplate } from "@/interface";
// import React, { useRef } from "react";
// import Mustache from "mustache";
// import usersGlobalStore, { IUsersStore } from "@/store/users-store";
// import { Button } from "antd";
// import { useRouter } from "next/navigation";
// import { useReactToPrint } from "react-to-print";

// function Resume({ template }: { template: ITemplate }) {
//   const router = useRouter();
//   const { currentUserData }: IUsersStore = usersGlobalStore();
//   const contentRef: any = useRef(null);

//   if (!currentUserData?.profileDataForResume) {
//     return <div>Profile data not found</div>;
//   }

//   let html = "";
//   try {
//     // Validate template exists and has html content
//     if (!template?.html) {
//       throw new Error("Template HTML is empty");
//     }
    
//     html = Mustache.render(
//       template.html,
//       currentUserData.profileDataForResume
//     );
//   } catch (error) {
//     console.error("Error rendering template:", error);
//     return (
//       <div className="text-red-500 p-4 border border-red-300 rounded">
//         Error rendering template: {(error as Error).message}
//         <div className="mt-2 text-xs">
//           Please check your template syntax. There might be unclosed Mustache tags.
//         </div>
//       </div>
//     );
//   }

//   const reactToPrintFn = useReactToPrint({ contentRef });

//   const showSaveBtn = !template.isOnlyForSubscribers || currentUserData?.currentSubscription;

//   return (
//     <div className="flex flex-col gap-8">
//       <div className="flex justify-end gap-5">
//         <Button onClick={() => router.push("/")} type="default">
//           Back To Templates
//         </Button>
//         {showSaveBtn && (
//           <Button type="primary" onClick={() => reactToPrintFn()}>
//             Print Or Save PDF
//           </Button>
//         )}
//       </div>

//       {!showSaveBtn && (
//         <div className="bg-red-500 bg-opacity-20 p-3 border-red-500 border text-sm">
//           This template is only available for subscribers. Please subscribe to
//           save or print this resume.
//         </div>
//       )}
//       <div className="border border-gray-300 border-solid rounded-sm">
//         <div dangerouslySetInnerHTML={{ __html: html }} ref={contentRef} />
//       </div>
//     </div>
//   );
// }

// export default Resume;

import React, { useRef, forwardRef } from "react";
import Mustache from "mustache";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { ITemplate } from "@/interface";

const Resume = forwardRef<HTMLDivElement, { template: ITemplate }>(
  ({ template }, ref) => {
    const router = useRouter();
    const { currentUserData }: IUsersStore = usersGlobalStore();
    const contentRef = useRef<HTMLDivElement>(null);

    if (!currentUserData?.profileDataForResume) {
      return <div>Profile data not found</div>;
    }

    let html = "";
    try {
      // Validate template exists and has html content
      if (!template?.html) {
        throw new Error("Template HTML is empty");
      }
      
      html = Mustache.render(
        template.html,
        currentUserData.profileDataForResume
      );
    } catch (error) {
      console.error("Error rendering template:", error);
      return (
        <div className="text-red-500 p-4 border border-red-300 rounded">
          Error rendering template: {(error as Error).message}
          <div className="mt-2 text-xs">
            Please check your template syntax. There might be unclosed Mustache tags.
          </div>
        </div>
      );
    }

    const reactToPrintFn = useReactToPrint({ contentRef });

    const showSaveBtn = !template.isOnlyForSubscribers || currentUserData?.currentSubscription;

    return (
      <div className="flex flex-col gap-8">
        <div className="flex justify-end gap-5">
          <Button onClick={() => router.push("/")} type="default">
            Back To Templates
          </Button>
          {showSaveBtn && (
            <Button type="primary" onClick={() => reactToPrintFn()}>
              Print Or Save PDF
            </Button>
          )}
        </div>

        {!showSaveBtn && (
          <div className="bg-red-500 bg-opacity-20 p-3 border-red-500 border text-sm">
            This template is only available for subscribers. Please subscribe to
            save or print this resume.
          </div>
        )}
        <div className="border border-gray-300 border-solid rounded-sm">
          <div dangerouslySetInnerHTML={{ __html: html }} ref={contentRef} />
        </div>
      </div>
    );
  }
);

export default Resume;
