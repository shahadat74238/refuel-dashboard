import { Space, Button, Tooltip, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditIcon } from "../icons/SvgIcons";
import type { IsportCategory } from "../../../types/category";
import { FaTrash } from "react-icons/fa";

export default function categoryTableColumns(
  onAction?: (action: "edit" | "delete", record: IsportCategory) => void,
): ColumnsType<IsportCategory> {
  return [
    {
      title: "Sports Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              style={{
                backgroundColor: "#D62828",
                color: "white",
              }}
              icon={<EditIcon />}
              onClick={() => onAction?.("edit", record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to remove this category?"
            placement="bottomRight"
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              style: {
                backgroundColor: "var(--primary)",
                color: "white",
              },
            }}
            cancelButtonProps={{
              style: {
                backgroundColor: "var(--color-white)",
                color: "var(--primary)",
              },
            }}
            onConfirm={() => {
              onAction?.("delete", record);
            }}
          >
            <Tooltip title="Delete">
              <Button danger icon={<FaTrash />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];
}
