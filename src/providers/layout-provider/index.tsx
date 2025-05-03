/** @format */

// 'use client'

// import { getCurrentUserFromMongoDB } from '@/server-actions/users';
// import usersGlobalStore from '@/store/users-store';
// import { UserButton } from '@clerk/nextjs';
// import { usePathname, useRouter } from 'next/navigation';
// import React, { useEffect } from 'react';
// import { IUsersStore } from '@/store/users-store';
// import Spinner from '@/components/Spinner';
// import AdminMenu from './admin-menu';

// function LayoutProvider({children} : {children: React.ReactNode}){

//     const [isisLaoding, setIsLoading] = React.useState(false);
//     const [error, setError] = React.useState<string | null>(null);
//     const pathname = usePathname();
//     const router = useRouter();
//     const isProtected = !pathname.includes('/sign-in') && !pathname.includes('/sign-up');
//     const {setCurrentUserData, currentUserData} : IUsersStore  = usersGlobalStore() as any;
//     const isAdminRoute = pathname.includes('/admin')

//     const getCurrentUser = async () => {
//         try {
//             setIsLoading( l => !l);
//             const response = await getCurrentUserFromMongoDB();
//             if(response.success){
//                 setCurrentUserData(response.data);
//             }
//             else {
//                 console.error(response.message);
//                 setError(response.message);
//             }

//         } catch (error: any) {
//             console.error(error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     useEffect(() => {
//         if(isProtected){
//             getCurrentUser();
//         }
//     },[pathname] );

//     if(!isProtected){
//         return <div>
//             {children}
//         </div>
//     }

//     if(isLoading) {
//         return <div className='flex justify-center items-center h-screen'>
//             <Spinner />
//         </div>
//     }

//     if(error) {
//         return <div className='p-5'>{error}</div>
//     }

//     if(currentUserData && !currentUserData?.isAdmin && !isLoading){
//         return <div className='p-5 text-sm text-gray-500' >
//             You are not authorized to access this page
//         </div>
//     }

//     return (
//        <div>
//         <div className='header p-5 bg-[#2C1D74] flex justify-between items-center'>
//             <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={  () => router.push('/')}>
//                 Resume Builder
//             </h1>
//             <div className='flex gap-5 items-center'>
//                 {
//                     currentUserData?.isAdmin ? <AdminMenu /> : <h1 className='text-sm text-white cursor-pointer' onClick={ () => router.push("/profile")}>
//                         {currentUserData?.name}
//                     </h1>
//                 }
//                 <UserButton />
//             </div>
//         </div>
//         <div className='p-5'>
//             {children}
//         </div>
//        </div>
//     );
// }

// export default LayoutProvider;

"use client";

import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import { UserButton } from "@clerk/nextjs";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import AdminMenu from "./admin-menu";
import Spinner from "@/app/profile/_components/Spinner";
import toast from "react-hot-toast";


function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [isLaoding, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isProtected =
    !pathname.includes("/sign-in") && !pathname.includes("/sign-up");
  const isAdminRoute = pathname.includes("/admin");
  const params = useParams();

  const { setCurrentUserData, currentUserData }: IUsersStore =
    usersGlobalStore() as any;

  const getCurrentUser = async () => {
    try {
      setIsLoading(true);
      const response = await getCurrentUserFromMongoDB();
      if (response.success) {
        setCurrentUserData(response.data);
      } else {
        toast.error(response.message);
        setError(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isProtected && !currentUserData) {
      getCurrentUser();
    }
  }, [pathname]);

  if (!isProtected) {
    return <div>{children}</div>;
  }

  if (isLaoding)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  if (error) return <div className="p-5">{error}</div>;

  if (
    currentUserData &&
    !currentUserData?.isAdmin &&
    isAdminRoute &&
    !isLaoding
  ) {
    return (
      <div className="p-5 text-sm text-gray-500">
        You are not authorized to access this page
      </div>
    );
  }


  let showHeader = true;

  if(pathname === `/template/${params.id}`){
    showHeader = false;
  }

  return (
    <div>
      
      {
        showHeader && (
          <div className="header p-5 bg-[#2C1d74] flex justify-between items-center">
            <h1
              className="text-3xl font-bold text-white cursor-pointer"
              onClick={() => router.push("/")}
            >
              Resume Builder
            </h1>
          <div className="flex gap-5 items-center">
          {currentUserData?.isAdmin ? (
            <AdminMenu />
          ) : (
            <h1
              className="text-sm text-white cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              {currentUserData?.name}
            </h1>
          )}
          <UserButton />
        </div>
      </div>
        )
      }
      <div className="p-5">{children}</div>
    </div>
  );
}

export default LayoutProvider;
