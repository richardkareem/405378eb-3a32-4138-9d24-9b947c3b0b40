import { ApiProperty } from '@nestjs/swagger';

// export type WorkerDto = {
//   id?: number;
//   first_name: string;
//   last_name: string;
//   position: string;
//   phone: string;
//   email: string;
// };

export class WorkerDto {
  // @ApiProperty()
  id: number;
  @ApiProperty({
    description: 'worker first name, required',
  })
  // @ApiProperty()
  first_name: string;
  @ApiProperty({
    description: 'worker last name, required',
  })
  // @ApiProperty()
  last_name: string;
  @ApiProperty({
    description: 'worker position, required',
  })
  // @ApiProperty()
  position: string;
  // @ApiProperty()
  @ApiProperty({
    description: 'email worker, required, unique',
  })
  email: string;
}
