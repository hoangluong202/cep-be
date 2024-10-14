import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SmartPoleService } from './smartpole.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { SmartPole } from './domain/smartpole';
import { QuerySmartPoleDto } from './dto/query-smartpole.dto';
import { InfinityPaginationResponseDto } from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { SmartPoleResponseDto } from './dto/smartpole-response.dto';

@ApiTags('SmartPole')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('smartpoles')
export class SmartPoleController {
  constructor(private readonly smartPoleService: SmartPoleService) {}

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id') id: SmartPole['id'],
  ): Promise<SmartPoleResponseDto> {
    return new SmartPoleResponseDto(await this.smartPoleService.findById(id));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: InfinityPaginationResponseDto<SmartPoleResponseDto> })
  async findAll(
    @Query() query: QuerySmartPoleDto,
  ): Promise<InfinityPaginationResponseDto<SmartPoleResponseDto>> {
    console.log('check query', query);
    const page = query?.paginate?.page;
    const limit = query?.paginate?.limit;
    const smartPoles = await this.smartPoleService.findManyWithPagination({
      filterOptions: query?.filters,
      sortOptions: query?.sorts,
      paginationOptions: {
        page,
        limit,
      },
    });
    const response = smartPoles.map(
      (smartPole) => new SmartPoleResponseDto(smartPole),
    );

    return infinityPagination(response, {
      page,
      limit,
    });
  }
}
