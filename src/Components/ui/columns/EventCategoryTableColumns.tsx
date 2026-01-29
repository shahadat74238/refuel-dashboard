import { Space, Button, Tooltip, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditIcon } from "../icons/SvgIcons";
import { FaTrash } from "react-icons/fa";
import type { IigniteTeam } from "../../../types/category";
import { imageUrl } from "../../../utils/imageHandler";

export default function IgniteTeamTableColumns({
  handleEditCategory,
  handleDeleteCategory,
}: {
  handleEditCategory: (record: IigniteTeam) => void;
  handleDeleteCategory: (id: string) => void;
}): ColumnsType<IigniteTeam> {
  return [
    {
      title: "Photo",
      dataIndex: "profile_image",
      key: "profile_image",
      render: (_, record) => (
        <img
          src={imageUrl({ image: record.profile_image })}
          alt={record.name}
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
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
              onClick={() => handleEditCategory(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this Ignite member?"
            onConfirm={() => handleDeleteCategory(record?._id)}
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
