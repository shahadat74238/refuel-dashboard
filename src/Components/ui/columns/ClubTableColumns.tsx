import { Space, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ClubRecord, sportsOfferedData } from "../../../types/User";
import { ViewDetailIcon } from "../icons/SvgIcons";
import { Delete } from "lucide-react";

export default function clubTableColumns(
    onAction?: (action: "view" | "block" | "delete", record: ClubRecord) => void
): ColumnsType<ClubRecord> {
    return [
        {
            title: "Academy/Club Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Sport(s) Offered",
            dataIndex: "sportsOffered",
            key: "sportOffered",
            render: (sportsOffered: any) => {
                return (
                    sportsOffered?.length > 0 ? sportsOffered?.map((sport: sportsOfferedData) => sport?.name || "-").join(", ") : "-"
                );
            },
        },
        {
            title: "Join Date",
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
            title: "Contact Person",
            dataIndex: "primaryContactName",
            key: "primaryContactName",
        },
        {
            title: "Email",
            dataIndex: "primaryContactEmail",
            key: "primaryContactEmail",
        },
        {
            title: "Status",
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        style={{
                            backgroundColor: '#D62828',
                            color: 'white'
                        }}
                        onClick={() => onAction?.("view", record)}
                        icon={<ViewDetailIcon />}
                    />
                    <Popconfirm
                    placement="bottomRight"
                    title="Are you sure to delete this club?" onConfirm={() => onAction?.("delete", record)}
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
