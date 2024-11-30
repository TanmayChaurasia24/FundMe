// components/avatar-uploader.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";



export function AvatarUploader({ onUploadSuccess }: any) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result) => {
        if (result?.info && typeof result.info === "object" && "secure_url" in result.info) {
          console.log(result);
          
          onUploadSuccess(result.info.secure_url);
        } else {
          console.error("Unexpected result structure:", result);
          alert("Failed to retrieve the uploaded image URL.");
        }
      }}
      
      options={{
        singleUploadAutoClose: true,
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="rounded-md bg-indigo-600 mt-5 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload Avatar
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
