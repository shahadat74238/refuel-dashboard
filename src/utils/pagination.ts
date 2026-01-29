import type { TablePaginationConfig } from "antd";

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage?: number;
}

export const getTablePagination = (
  meta: IMeta,
  overrides: Partial<TablePaginationConfig> = {}
): TablePaginationConfig => {
  return {
    current: meta.page,
    pageSize: meta.limit,
    total: meta.total,
    showSizeChanger: false,
    showQuickJumper: false,
    position: ["bottomCenter"],
    ...overrides, 
  };
};
