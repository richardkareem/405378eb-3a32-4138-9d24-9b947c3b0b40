import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { WorkerDto } from '../dto/WorkerDto';
import { QueryType } from 'src/types/Query.type';
import { validateEmail } from '../../utils/helper';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class WorkerService {
  constructor(private prismaService: PrismaService) {}

  async getAllWorker(query: QueryType) {
    const { sort, orderby } = query;
    const limit = Number(query.limit) ? Number(query.limit) : 10;
    const page = Number(query.page);
    const skip = (page - 1) * limit;
    const count = await this.prismaService.worker.count();
    let data = [];

    if (!page) {
      throw new Error('Please insert page query');
    }

    if (sort && !orderby) {
      throw new Error('please insert orderby query');
    }

    if (sort) {
      data = await this.prismaService.worker.findMany({
        skip,
        take: limit,
        orderBy: {
          [sort]: orderby,
        },
      });
    } else {
      data = await this.prismaService.worker.findMany({
        skip,
        take: limit,
      });
    }

    const currentPage = page > 1 ? page - 1 : null;
    const totalPage = parseInt(Math.ceil(count / Number(limit)).toString());
    const nextPage = page >= totalPage || totalPage === 0 ? null : page + 1;

    const pagination = {
      page: page,
      total_data: count,
      next_page: nextPage,
      prev_page: currentPage,
      // current_page: query.page,
      total_page: totalPage,
    };
    return {
      data,
      pagination,
    };
  }

  async createWorker(datas: WorkerDto[], query: QueryType) {
    try {
      const isEmptyData = datas.some((data) => {
        return Object.keys(data).some((item) => data[item] === '');
      });
      if (isEmptyData) {
        throw new Error('some input is empty');
      }
      const isNotValidEmail = datas.some((data) => {
        if (validateEmail(data.email) === null) {
          return data;
        }
      });

      if (isNotValidEmail) {
        throw new Error('some email is invalid');
      }
      // const newDatas = datas
      await this.prismaService.worker.createMany({
        data: datas,
      });

      return await this.getAllWorker(query);
    } catch (e) {
      throw e;
    }
  }

  async deleteWorkerById(ids: number[]) {
    try {
      if (ids.length === 0 || !ids) {
        throw new Error('id is empty');
      }
      if (ids.length == 1) {
        await this.prismaService.worker.delete({
          where: {
            id: ids[0],
          },
        });
      } else {
        ids.map(async (id) => {
          await this.prismaService.worker.delete({
            where: {
              id: id,
            },
          });
        });
      }
    } catch (e: PrismaClientKnownRequestError | unknown) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw e;
      }
      throw e;
    }
  }

  async updateWorker(datas: WorkerDto[]) {
    try {
      if (!datas) {
        throw new Error('data worker is empty');
      }
      const isDontHaveId = datas.some((data) => {
        if (!data.id) {
          return data;
        }
      });
      if (isDontHaveId) {
        throw new Error('some id is empty');
      }
      const isNotValidEmail = datas.some((data) => {
        if (validateEmail(data.email) === null) {
          return data;
        }
      });
      if (isNotValidEmail) {
        throw new Error('email not valid');
      }
      if (datas.length === 0) {
        await this.prismaService.worker.update({
          data: datas[0],
          where: {
            id: datas[0]?.id,
          },
        });
      } else {
        datas.map(async (item) => {
          await this.prismaService.worker.updateMany({
            data: item,
            where: {
              id: item?.id,
            },
          });
        });
      }
    } catch (e) {
      throw e;
    }
  }
}
