/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "antd";
import toast from "react-hot-toast";
import JoditComponent from "../../Components/Shared/JoditComponent";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";
import { primaryBtn } from "../../constant/btnStyle";
import {
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "../../redux/services/settingApis";

const PrivacyPolicy = () => {
  const { data: privacyPolicy, isLoading } =
    useGetPrivacyPolicyQuery(undefined);
  const [updatePrivacyPolicy, { isLoading: updateLoading }] =
    useUpdatePrivacyPolicyMutation();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (privacyPolicy?.data?.content) {
      setContent(privacyPolicy.data.content);
    }
  }, [privacyPolicy]);

  const handleSubmit = async () => {
    try {
      if (!content) {
        throw new Error("Please enter privacy policy");
      }

      // 1. Get the ID from the fetched data
      const policyId = privacyPolicy?.data?._id;

      if (!policyId) {
        toast.error("Policy ID not found. Cannot update.");
        return;
      }

      // 2. Prepare the payload with id and the data body
      const payload = {
        id: policyId,
        data: {
          content: content, // Use 'content' or 'description' based on your backend field name
        },
      };

      // 3. Call the mutation
      await updatePrivacyPolicy(payload)
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(
              res?.message || "Privacy Policy updated successfully",
            );
          }
        });
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to update Privacy Policy",
      );
    }
  };
  return (
    <PageLayout title="Privacy Policy">
      <PageContent>
        <JoditComponent setContent={setContent} content={content} />
        <Button
          size="large"
          onClick={() => handleSubmit()}
          disabled={isLoading || updateLoading}
          loading={isLoading || updateLoading}
          style={primaryBtn}
        >
          Submit
        </Button>
      </PageContent>
    </PageLayout>
  );
};

export default PrivacyPolicy;
