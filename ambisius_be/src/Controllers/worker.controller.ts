import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { WorkerDto } from 'src/Models/dto/WorkerDto';
import { WorkerService } from 'src/Models/services/worker.service';
import { QueryType } from 'src/types/Query.type';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteWorkerDto } from '../Models/dto/DeleteWorkerDto';
@ApiTags('Worker')
@Controller('api/worker')
export class WorkerController {
  constructor(private wokerService: WorkerService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get Data worker',
    isArray: true,
    example: {
      body: {
        message: 'Success retreive all workers',
        status: 200,
        params: {
          data: [
            {
              id: 45,
              first_name: 'Bob',
              last_name: 'Johnson',
              position: 'Product Manager',
              email: 'bob.johnson@example.com',
            },
            {
              id: 46,
              first_name: 'Carol',
              last_name: 'Williams',
              position: 'UX Designer',
              email: 'carol.williams@example.com',
            },
          ],
          pagination: {
            page: 1,
            total_data: 24,
            next_page: 2,
            prev_page: null,
            total_page: 2,
          },
        },
      },
      // Document the response body as an array of WorkerDto
    },
  })
  async getAllWorker(@Query() query: QueryType) {
    try {
      const data = await this.wokerService.getAllWorker(query);
      return {
        message: 'Success retreive all workers',
        status: 200,
        params: {
          data: data.data,
          pagination: data.pagination,
        },
      };
    } catch (error: Error | unknown) {
      if (error instanceof Error)
        return {
          message: error?.message,
          status: 401,
        };
    }
  }

  @Post()
  @ApiBody({
    description: 'Array of WorkerDto to be added',
  })
  @ApiResponse({
    status: 200,
    description: 'Array of WorkerDto to be added',
    isArray: true,
    example: {
      body: {
        message: 'Success create  worker',
        status: 200,
        params: {
          data: [
            {
              id: 45,
              first_name: 'Bob',
              last_name: 'Johnson',
              position: 'Product Manager',
              email: 'bob.johnson@example.com',
            },
            {
              id: 46,
              first_name: 'Carol',
              last_name: 'Williams',
              position: 'UX Designer',
              email: 'carol.williams@example.com',
            },
          ],
          pagination: {
            page: 1,
            total_data: 24,
            next_page: 2,
            prev_page: null,
            total_page: 2,
          },
        },
      },
    },
    // Document the response body as an array of WorkerDto
  })
  async postWorker(@Query() query: QueryType, @Body() body: WorkerDto[]) {
    try {
      const data = await this.wokerService.createWorker(body, query);

      return {
        message: 'Success create  worker',
        status: 200,
        params: {
          data: data.data,
          pagination: data.pagination,
        },
      };
    } catch (e: Error | unknown) {
      if (e instanceof Error) {
        return {
          message: e?.message,
          status: 401,
        };
      } else {
        return {
          message: 'email is duplicated',
          status: 401,
        };
      }
    }
  }

  @Delete()
  @ApiBody({
    description: 'delete worker by id',
    type: [DeleteWorkerDto],
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: 'delete multiple or single by id',
    example: {
      status: 200,
      message: 'Success delete worker',
    },
  })
  async deleteWorkerbyId(@Body() ids: number[]) {
    try {
      const newIds = ids.map((id) => {
        if (!isNaN(id)) {
          return Number(id);
        }
        return id;
      });
      await this.wokerService.deleteWorkerById(newIds);
      return {
        message: 'success delete worker',
        status: 200,
      };
    } catch (error: Error | unknown) {
      if (error instanceof Error)
        return {
          message: error?.message,
          status: 401,
        };
    }
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: 'updated multiple or single worker',
    example: {
      status: 200,
      message: 'Success update worker',
    },
  })
  async updateWorkerById(@Body() datas: WorkerDto[]) {
    try {
      const newDatas = datas.map((item) => {
        if (isNaN(item.id) === false) {
          return {
            ...item,
            id: Number(item.id),
          };
        }
        return item;
      });
      await this.wokerService.updateWorker(newDatas);

      return {
        message: 'Success update worker',
        status: 200,
      };
    } catch (error: Error | unknown) {
      if (error instanceof Error)
        return {
          message: error?.message,
          status: 401,
        };
    }
  }
}
