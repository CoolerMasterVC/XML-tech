import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PyFuncService } from './pyFunc.service';
import { CreatePyFuncDto } from './dto/create-pyFunc.dto';
import { UpdatePyFuncDto } from './dto/update-pyFunc.dto';
import { PyFunc } from './entities/pyFunc.entity';

@Controller('pyFunc')
export class PyFuncController {
  constructor(private readonly pyFuncsService: PyFuncService) {}

  @Post()
  create(@Body() createPyFuncDto: CreatePyFuncDto) {
    return this.pyFuncsService.create(createPyFuncDto);
  }

  @Get()
  findAll(@Query('title') title?: string): PyFunc[] {
    return this.pyFuncsService.findAll(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pyFuncsService.findOne(+id);
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePyFuncDto: UpdatePyFuncDto) {
    return this.pyFuncsService.update(+id, updatePyFuncDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pyFuncsService.remove(+id);
  }
}
