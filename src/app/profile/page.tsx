


/** @format */

"use client";

import React from "react";
import { Form, Tabs, Button, Input } from "antd";

import Basic from "./_components/basic";
import Education from "./_components/Education";
import Experience from "./_components/Experience";
import Skills from "./_components/Skills";

import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import { updateUserProfile } from "@/server-actions/users";

import { uploadFileToFirebaseAndReturnUrl } from "../helpers/media-upload";

import toast from "react-hot-toast";
import UserSubscription from "./_components/user-subscription";

// Tab Items


export default function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("1");
  const { currentUserData, setCurrentUserData }: IUsersStore = usersGlobalStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [candidatePhoto, setCandidatePhoto ] = React.useState<any>(currentUserData?.profileDataForResume?.candidatePhoto || "");

  const items = [
    { label: "Basic", key: "1", children: <Basic candidatePhoto={candidatePhoto} setCandidatePhoto={setCandidatePhoto} /> },
    { label: "Education", key: "2", children: <Education /> },
    { label: "Skills", key: "3", children: <Skills /> },
    { label: "Experience", key: "4", children: <Experience /> },
  ];

  // Ensure profileDataForResume is always initialized
  const initialProfileData = currentUserData?.profileDataForResume || {
    skills: [],
    education: [],
    experience: [],
  };

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);

      // Ensure currentUserData is defined before accessing it
      if (!currentUserData) {
        toast.error("User data is missing.");
        return;
      }

      // Check if profileDataForResume is defined
      const profileDataForResume = currentUserData.profileDataForResume || {
        skills: [],
        education: [],
        experience: [],
      };

      // Fill missing values with currentUserData's profileDataForResume if not provided in the form
      ["skills", "education", "experience"].forEach((key) => {
        if (!values[key]) {
          values[key] = profileDataForResume[key] || [];
        }
      });

      if(candidatePhoto &&  typeof candidatePhoto == "object"){
        values.candidatePhoto = await uploadFileToFirebaseAndReturnUrl(candidatePhoto);

      } else {
        values.candidatePhoto = candidatePhoto;
      }

      // Log currentUserData for debugging purposes
      console.log("Current User Data:", currentUserData);

      // Make API call to update the user profile
      const response = await updateUserProfile({
        userId: currentUserData!._id,
        data: {
          ...currentUserData,
          profileDataForResume: values,
        },
      });

      // Handle the response
      if (response.success && response.data) {
        setCurrentUserData(response.data);
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error: any) {
      console.error("Error while updating profile:", error); // Log error for debugging
      toast.error(error.message || "An error occurred while updating the profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-bold uppercase text-[#2C1D74]">Profile</h1>
      <UserSubscription />
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialProfileData} // Use fallback values
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
        />
        <div className="flex justify-end gap-6 mt-5">
          <Button
            disabled={isLoading}
            onClick={() => {
              // Optionally handle "Cancel" logic here (e.g., reset form or navigate back)
              console.log("Cancel clicked");
            }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Save & Update
          </Button>
        </div>
      </Form>
    </div>
  );
}

