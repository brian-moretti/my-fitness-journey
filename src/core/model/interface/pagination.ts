import { PaginatorState } from 'primeng/paginator';

export interface IPagination extends PaginatorState {
  totalRecords?: number;
}
