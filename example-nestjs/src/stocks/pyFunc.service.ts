import { Injectable } from '@nestjs/common';
import { CreatePyFuncDto } from './dto/create-pyFunc.dto';
import { UpdatePyFuncDto } from './dto/update-pyFunc.dto';
import { FileService, FileAccessor} from '../../file.service';
import { PyFunc } from './entities/pyFunc.entity';

@Injectable()
export class PyFuncService {
  constructor(private fileService: FileService<PyFunc[]>) {}
  create(createPyFuncDto: CreatePyFuncDto) {
    const pyFuncs = this.fileService.read();

    // для простоты новый id = текущее количество карточек + 1
    const pyFunc = { ...createPyFuncDto, id: pyFuncs.length + 1 };

    this.fileService.add(pyFunc);
  }

  findOne(id: number): PyFunc | null {
    const pyFuncs = this.fileService.read();

    return pyFuncs.find((pyFunc) => pyFunc.id === id) ?? null;
  }

  update(id: number, updatePyFuncDto: UpdatePyFuncDto): void {
    const pyFuncs = this.fileService.read();

    const updatedPyFuncs = pyFuncs.map((pyFunc) =>
      pyFunc.id === id ? { ...pyFunc, ...updatePyFuncDto } : pyFunc,
    );

    this.fileService.write(updatedPyFuncs);
  }

  remove(id: number): void {
    const filteredPyFuncs = this.fileService
      .read()
      .filter((pyFunc) => pyFunc.id !== id);

    this.fileService.write(filteredPyFuncs);
  }
  findAll(title?: string): PyFunc[] {
    const pyFuncs = this.fileService.read();

    return title
      ? pyFuncs.filter((pyFunc) =>
          pyFunc.title.toLowerCase().includes(title.toLowerCase()),
        )
      : pyFuncs;
  }
}
