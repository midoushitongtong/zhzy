export type Category = {
  id: string;
  title: string;
  avatar?: string;
  description: string;
  createdAt: string;
};

export type GetCategoryListReturns = {
  data: Category[];
  pageNumber: number;
  pageSize: number;
  total: number;
};

export type CategoryDetail = Category;

export type GetCategoryDetailReturns = {
  data: CategoryDetail;
};
