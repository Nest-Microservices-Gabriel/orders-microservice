import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatusList } from 'src/orders/enum/order.enum';
import { OrderStatus } from '@prisma/client';
import { PaginationDto } from 'src/common';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Possible values are ${OrderStatusList.join(', ')}`,
  })
  status: OrderStatus;
}
