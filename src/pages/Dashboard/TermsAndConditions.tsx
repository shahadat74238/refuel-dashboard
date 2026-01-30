/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "antd";
import toast from "react-hot-toast";
import JoditComponent from "../../Components/Shared/JoditComponent";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";
import { primaryBtn } from "../../constant/btnStyle";

const contents = "Amar soner Bangla";

const TermsAndConditions = () => {
  const [content, setContent] = useState(contents);

  const handleSubmit = async () => {
    try {
      toast.success("Updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to update");
    }
  };
  return (
    <PageLayout title="Terms and Conditions">
      <PageContent>
        <JoditComponent setContent={setContent} content={content} />
        <Button size="large" onClick={() => handleSubmit()} style={primaryBtn}>
          Submit
        </Button>
      </PageContent>
    </PageLayout>
  );
};

export default TermsAndConditions;
