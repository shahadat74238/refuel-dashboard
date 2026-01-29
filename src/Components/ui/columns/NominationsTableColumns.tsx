import { Space, Button, Tag, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ChildRegistrationData } from "../../../types/childRegistration";
import { ViewDetailIcon } from "../icons/SvgIcons";
import { Delete } from "lucide-react";

export default function nominationsTableColumns(
    onAction?: (action: "view" | "block" | "delete", record: ChildRegistrationData) => void
): ColumnsType<ChildRegistrationData> {
    return [
        {
            title: "Child Name",
            dataIndex: "childFirstName",
            key: "childFirstName"
        },
        {
            title: "Sport",
            dataIndex: "childSport",
            key: "childSport",
            render: (childSport: { name: string }) => <span>{childSport?.name}</span>,
        },
        {
            title: "Apply Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: string) => {
                const date = new Date(createdAt);
                const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                    date.getDate()
                ).padStart(2, "0")}`;
                return <span>{formatted}</span>;
            },
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Placement",
            dataIndex: 'isPlaced',
            key: 'isPlaced',
            render: (isPlaced: boolean) => {
                return isPlaced ? <Tag color="green">Placed</Tag> : <Tag color="red">Not Placed</Tag>;
            },
        },
        {
            title: "Parent/Guardian",
            dataIndex: 'guardianFirstName',
            key: 'guardianFirstName',
            render: (_, record) => <span>{record?.guardianFirstName + ' ' + record?.guardianLastName}</span>,
        },
        {
            title: "Email",
            dataIndex: 'guardianEmail',
            key: 'guardianEmail',
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        style={{
                            backgroundColor: '#D62828',
                            color: 'white',
                        }}
                        icon={<ViewDetailIcon />}
                        onClick={() => onAction?.("view", record)}
                    />
                    <Popconfirm
                        placement="bottomRight"
                        title="Are you sure to delete this nomination?" onConfirm={() => onAction?.("delete", record)}
                        okButtonProps={{
                            style: {
                                backgroundColor: '#D62828',
                                color: 'white'
                            }
                        }}
                    >
                        <Button
                            style={{
                                backgroundColor: '#D62828',
                                color: 'white'
                            }}
                            icon={<Delete />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
}
