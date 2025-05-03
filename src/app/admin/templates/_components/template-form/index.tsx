/** @format */

"use client";

import { Form, Input, Radio, Upload, Button } from "antd";
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html"; // for HTML syntax highlighting
import { useRouter } from "next/navigation";
import { uploadFileToFirebaseAndReturnUrl } from "@/app/helpers/media-upload";
import toast from "react-hot-toast";
import {
  createNewTemplate,
  updateTemplateById,
} from "@/server-actions/templates";

function TemplateForm({
  initialValues = {},
  type = "new",
}: {
  initialValues?: any;
  type?: "new" | "edit";
}) {
  const [thumbnail, setThumbnail] = React.useState<any>(
    initialValues?.thumbnail || ""
  );
  const [htmlContent, setHtmlContent] = React.useState<any>(initialValues?.html || "");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fileList, setFileList] = React.useState<any[]>([]); // to control the file list in Upload component
  const router = useRouter();

  // Set the initial file list if in 'edit' mode
  React.useEffect(() => {
    if (type === "edit" && initialValues?.thumbnail) {
      setFileList([
        {
          url: initialValues.thumbnail, // URL to the image in edit mode
        },
      ]);
    }
  }, [type, initialValues?.thumbnail]);

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);

      // Handle thumbnail upload (if not already a URL string)
      if (typeof thumbnail !== "string") {
        values.thumbnail = await uploadFileToFirebaseAndReturnUrl(thumbnail);
      } else {
        values.thumbnail = thumbnail;
      }

      values.html = htmlContent;

      let response = null;

      // If we're in "new" mode, create a new template, otherwise, update the existing one
      if (type === "new") {
        response = await createNewTemplate(values);
      } else if (type === "edit" && initialValues._id) {
        // Ensure we have an ID for updating an existing template
        response = await updateTemplateById(initialValues._id, values);
      } else {
        toast.error("Invalid operation. Could not determine whether to create or update.");
        return;
      }

      if (response.success) {
        toast.success(
          type === "new"
            ? "Template created successfully"
            : "Template updated successfully"
        );
        router.push("/admin/templates");
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThumbnailChange = (file: any) => {
    setThumbnail(file); // Set the selected file to the state
    setFileList([
      {
        url: URL.createObjectURL(file),
      },
    ]); // Update the file list for immediate preview
  };

  return (
    <div className="mt-7">
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="flex flex-col gap-5 mt-7"
        initialValues={initialValues}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the template name" }]}
        >
          <Input placeholder="Enter Template Name" />
        </Form.Item>

        <Form.Item
          label="Thumbnail"
          name="thumbnail"
          rules={[{ required: true, message: "Please upload a thumbnail" }]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList} // This should reflect the `fileList` state
            beforeUpload={(file) => {
              handleThumbnailChange(file); // Handle thumbnail change
              return false; // Prevent automatic upload (we handle it manually)
            }}
            onRemove={() => {
              setThumbnail(""); // Clear thumbnail state when removed
              setFileList([]); // Clear file list when removed
            }}
          >
            <div className="span text-xs">Upload thumbnail</div>
          </Upload>
        </Form.Item>

        <Form.Item label="Is Only For Subscribers" name="isOnlyForSubscribers">
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="HTML"
          name="html"
          rules={[{ required: true, message: "HTML content is required" }]}
        >
          <CodeMirror
            value={htmlContent}
            onChange={(value) => setHtmlContent(value)}
            height="300px"
            extensions={[html()]}
          />
        </Form.Item>

        <div className="flex justify-end gap-7">
          <Button
            onClick={() => router.push("/admin/templates")}
            type="default"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default TemplateForm;

