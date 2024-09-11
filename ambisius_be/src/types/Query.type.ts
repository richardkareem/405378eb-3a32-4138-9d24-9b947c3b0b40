import { WorkerDto } from 'src/Models/dto/WorkerDto';

export type QueryType = {
  page: string;
  limit: string;
  sort: keyof WorkerDto;
  orderby: 'asc' | 'desc';
};
