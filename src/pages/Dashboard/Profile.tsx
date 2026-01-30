/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import ProfileEdit from "../../Components/ui/profile-component/ProfileEdit";
import ChangePassword from "../../Components/ui/profile-component/ChangePassword";
import { CameraIcon } from "../../Components/ui/icons/SvgIcons";

const Tabs = ["Edit Profile", "Change Password"] as const;

const Profile = () => {
  const [tab, setTab] = useState<(typeof Tabs)[number]>(Tabs[0]);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  console.log(image);

  // Handle local image selection and preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  // Clean up memory when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <>
      <div className="max-w-[700px] mx-auto p-4 rounded-md">
        <div className="w-full flex justify-center items-center">
          <div
            onClick={() => {
              if (tab === "Edit Profile") {
                document.getElementById("fileInput")?.click();
              }
            }}
            className={`w-24 h-24 rounded-full relative ${
              tab === "Edit Profile" ? "cursor-pointer" : ""
            }`}
          >
            <img
              className="w-full h-full object-cover rounded-full border-2 border-gray-200"
              src={
                preview ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" // 3.
              }
              alt="Profile"
            />
            {tab === "Edit Profile" && (
              <button
                type="button"
                aria-label="Edit Profile Picture"
                className="absolute bg-[#3A7292] p-2 rounded-full right-0 bottom-0 text-white shadow-md"
              >
                <CameraIcon />
              </button>
            )}

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <p className="text-2xl text-center text-foreground font-medium mt-3">
          {"User Name"}
        </p>
      </div>

      {/* Tabs Section */}
      <div className="mx-auto flex items-center justify-center gap-x-6 my-6 border-b border-gray-100 w-fit px-4">
        {Tabs.map((item) => (
          <button
            key={item}
            className={`pb-2 text-base cursor-pointer transition-all duration-200 ${
              item === tab
                ? "text-[#3A7292] font-semibold border-b-2 border-[#3A7292]"
                : "text-gray-500 hover:text-[#3A7292]"
            }`}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* <div className="max-w-[481px] mx-auto p-4">
        {tab === "Edit Profile" ? (
          <ProfileEdit
            image={image}
            data={userData}
            setImage={(img) => {
              setImage(img);
              if (!img) setPreview(null); // Clear preview if image reset
            }}
          />
        ) : (
          <ChangePassword />
        )}
      </div> */}
    </>
  );
};

export default Profile;
