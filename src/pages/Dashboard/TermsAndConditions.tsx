/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import toast from "react-hot-toast";
import JoditComponent from "../../Components/Shared/JoditComponent";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";
import { primaryBtn } from "../../constant/btnStyle";
import { useGetTermsAndConditionsQuery, useUpdateTermsAndConditionsMutation } from "../../redux/services/settingApi";
 // Adjust path to your api file

const TermsAndConditions = () => {
  const [content, setContent] = useState("");
  
  // 1. Fetch Data
  const { data: termsData, isLoading: isFetching } = useGetTermsAndConditionsQuery(undefined);
  
  // 2. Mutation Hook
  const [updateTerms, { isLoading: isUpdating }] = useUpdateTermsAndConditionsMutation();

  // 3. Sync fetched data to state
  useEffect(() => {
    if (termsData?.data?.description) {
      setContent(termsData.data.description);
    }
  }, [termsData]);

  const handleSubmit = async () => {
    if (!termsData?.data?._id) {
        return toast.error("Content ID not found");
    }

    try {
      // 4. Call mutation with ID and description
      const res = await updateTerms({
        id: termsData.data._id,
        data: { description: content },
      }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Updated successfully");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to update");
    }
  };

  return (
    <PageLayout title="Terms and Conditions">
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
              loading={isUpdating} // Show loading state on button
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

export default TermsAndConditions;