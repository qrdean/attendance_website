import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let datas = [
    { mean: .6, missed: 3 }
    ];
    return {datas};
  }
}
