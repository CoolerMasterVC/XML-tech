import { Module } from '@nestjs/common';
import { PyFuncService } from './pyFunc.service';
import { PyFuncController } from './pyFunc.controller';
import { FileService, FileAccessor} from '../../file.service';
import { PyFunc } from './entities/pyFunc.entity';

@Module({
  controllers: [PyFuncController],
  providers: [
    PyFuncService,
    {
      provide: FileService,
      useFactory: () => new FileService<PyFunc[]>('assets/pyFunc.json'),
    },
  ],
})
export class PyFuncsModule {}