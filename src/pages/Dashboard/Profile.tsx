import React, { useState, useEffect } from "react";
import ProfileEdit from "../../Components/ui/profile-component/ProfileEdit";
import ChangePassword from "../../Components/ui/profile-component/ChangePassword";
import { AiOutlineCamera } from "react-icons/ai";
import { useUserMyProfileQuery } from "../../redux/services/profileApis";

const Tabs = ["Edit Profile", "Change Password"] as const;

const Profile = () => {
  const { data: profileResponse, isLoading } = useUserMyProfileQuery(undefined);
  const [tab, setTab] = useState<(typeof Tabs)[number]>(Tabs[0]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const base_url = "http://10.10.20.57:8001"

  const userData = profileResponse?.data;

  // Handle local image selection and preview
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  // Construct image URL (Add your Base URL here if needed)
  const serverImage = userData?.image 
    ? `${base_url}/${userData.image}` 
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s";

  return (
    <>
      <div className="max-w-[700px] mx-auto p-4 rounded-md">
        <div className="w-full flex justify-center items-center">
          <div
            onClick={() => tab === "Edit Profile" && document.getElementById("fileInput")?.click()}
            className={`w-24 h-24 rounded-full relative ${tab === "Edit Profile" ? "cursor-pointer" : ""}`}
          >
            <img
              className="w-full h-full object-cover rounded-full border-2 border-gray-200"
              src={preview || serverImage}
              alt="Profile"
            />
            {tab === "Edit Profile" && (
              <button className="absolute bg-primary cursor-pointer p-2 rounded-full right-0 bottom-0  shadow-md">
                <AiOutlineCamera />
              </button>
            )}
            <input id="fileInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>
        </div>
        <p className="text-2xl text-center text-foreground font-medium mt-3">
          {userData?.name || "User Name"}
        </p>
      </div>

      <div className="mx-auto flex items-center justify-center gap-x-6 my-6 w-fit px-4">
        {Tabs.map((item) => (
          <button
            key={item}
            className={`pb-2 text-base transition-all ${item === tab ? "text-core-primary font-semibold border-b-2 border-core-primary" : "text-muted"}`}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="max-w-[481px] mx-auto p-4">
        {tab === "Edit Profile" ? (
          <ProfileEdit image={image} data={userData} />
        ) : (
          <ChangePassword />
        )}
      </div>
    </>
  );
};

export default Profile;