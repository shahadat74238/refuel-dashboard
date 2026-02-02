/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import toast from "react-hot-toast";
import JoditComponent from "../../Components/Shared/JoditComponent";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";
import { primaryBtn } from "../../constant/btnStyle";
import { useGetPrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } from "../../redux/services/settingApi";
 // Adjust this path to your RTK folder

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");

  // 1. Fetch Privacy Policy Data
  const { data: privacyData, isLoading: isFetching } = useGetPrivacyPolicyQuery(undefined);

  // 2. Mutation for Updating
  const [updatePrivacy, { isLoading: isUpdating }] = useUpdatePrivacyPolicyMutation();

  // 3. Sync fetched data with state
  useEffect(() => {
    if (privacyData?.data?.description) {
      setContent(privacyData.data.description);
    }
  }, [privacyData]);

  const handleSubmit = async () => {
    const id = privacyData?.data?._id;

    if (!id) {
      return toast.error("Resource ID not found");
    }

    try {
      // 4. Trigger Update API
      const res = await updatePrivacy({
        id: id,
        data: { description: content },
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Privacy Policy updated successfully");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to update Privacy Policy"
      );
    }
  };

  return (
    <PageLayout title="Privacy Policy">
      <PageContent>
        {isFetching ? (
          <div className="flex justify-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <JoditComponent setContent={setContent} content={content} />
            <Button
              size="large"
              onClick={handleSubmit}
              style={primaryBtn}
              loading={isUpdating} // Shows spinner on button during request
              className="mt-4"
            >
              {isUpdating ? "Updating..." : "Submit"}
            </Button>
          </>
        )}
      </PageContent>
    </PageLayout>
  );
};

export default PrivacyPolicy;