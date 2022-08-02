import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export type SwaggerPropertyType = {
  response?: ApiResponseOptions;
  operation?: Partial<OperationObject>;
};

export function ApiSwagger(
  options: SwaggerPropertyType,
): MethodDecorator & ClassDecorator {
  return applyDecorators(
    ApiOkResponse(options.response),
    ApiOperation(options.operation),
  );
}
