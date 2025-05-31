import { PartialType } from '@nestjs/mapped-types';
import { CreatePyFuncDto } from './create-pyFunc.dto';

export class UpdatePyFuncDto extends PartialType(CreatePyFuncDto) {}
