/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "antd";
import toast from "react-hot-toast";
import JoditComponent from "../../Components/Shared/JoditComponent";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";
import { primaryBtn } from "../../constant/btnStyle";
import {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../redux/services/settingApis";

const TermsAndConditions = () => {
  const { data: terms, isLoading } = useGetTermsAndConditionsQuery(undefined);
  const [updateTerms, { isLoading: addLoading }] =
    useUpdateTermsAndConditionsMutation();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (terms?.data?.content) {
      setContent(terms.data.content);
    }
  }, [terms]);

  const handleSubmit = async () => {
    try {
      if (!content) {
        throw new Error("Please enter terms and conditions");
      }

      // 1. Extract the ID from the retrieved data
      const termsId = terms?.data?._id;

      if (!termsId) {
        toast.error("Terms ID not found");
        return;
      }

      // 2. Prepare the payload as an object containing 'id' and 'data'
      // This matches your mutation: query: ({ id, data }) => ...
      const payload = {
        id: termsId,
        data: {
          content: content,
        },
      };

      // 3. Pass the payload to the mutation
      await updateTerms(payload)
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || "Updated successfully");
          }
        });
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to update");
    }
  };
  return (
    <PageLayout title="Terms and Conditions">
      <PageContent>
        <JoditComponent setContent={setContent} content={content} />
        <Button
          size="large"
          onClick={() => handleSubmit()}
          disabled={isLoading || addLoading}
          loading={isLoading || addLoading}
          style={primaryBtn}
        >
          Submit
        </Button>
      </PageContent>
    </PageLayout>
  );
};

export default TermsAndConditions;
