import { useEffect } from "react";
import { Form, Input, Modal, Button, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { imageUrl } from "../../../utils/imageHandler";
import { primaryBtn } from "../../../constant/btnStyle";
import type { IigniteTeam } from "../../../types/category";


interface CategoryFormValues {
    avatar?: UploadFile[];
    name: string;
}


interface CategoryFormProps {
    open: boolean;
    hide: (value: boolean) => void;
    title: string;
    onFinish: (values: CategoryFormValues) => void;
    record?: IigniteTeam | null;
    loading?: boolean;
    form: any;
    btnText: string;
    fileList: UploadFile[];
    setFileList: (fileList: UploadFile[]) => void;
}


function FormWithImage({
    open,
    hide,
    title,
    onFinish,
    record,
    loading,
    form,
    btnText,
    fileList,
    setFileList
}: CategoryFormProps) {
    useEffect(() => {
        if (record) {
            form.setFieldsValue({ name: record.name, position: record.position });
            if (record.profile_image) {
                setFileList([
                    {
                        uid: "-1",
                        name: record.name,
                        status: "done",
                        url: imageUrl({ image: record.profile_image }),
                    },
                ]);
            }
        } else {
            form.resetFields();
            setFileList([]);
        }
    }, [record, form]);


    const handleUploadChange = (info: { fileList: UploadFile[] }) => {
        setFileList(info.fileList);
    };

    return (
        <Modal
            title={title}
            open={open}
            onCancel={() => hide(false)}
            footer={null}
            centered
            destroyOnHidden
        >
            <Form<CategoryFormValues>
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                form={form}
            >
                <Form.Item name="avatar" label="Category Icon">
                    <Upload
                        name="avatar"
                        listType="picture"
                        maxCount={1}
                        accept="image/*"
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please input name!" }]}
                >
                    <Input size="large" placeholder="Enter name" />
                </Form.Item>
                <Form.Item
                    name="position"
                    label="Position"
                    rules={[{ required: true, message: "Please input position!" }]}
                >
                    <Input size="large" placeholder="Enter position" />
                </Form.Item>

                <Form.Item>
                    <Button
                        style={primaryBtn}
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        {btnText}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default FormWithImage;
