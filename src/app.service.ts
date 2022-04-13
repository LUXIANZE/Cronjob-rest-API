import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    (async () => {
      const etherchainObservable = this.httpService.get(
        'https://etherchain.org/search/accounts/0x876eabf441b2ee5b5b0554fd502a8e0600950cfa',
      );
      const ethplorerObservable = this.httpService.get(
        'https://ethplorer.io/service/service.php?data=0x876eabf441b2ee5b5b0554fd502a8e0600950cfa',
      );

      const [etherchain, ethplorer] = await Promise.all([
        firstValueFrom(etherchainObservable),
        firstValueFrom(ethplorerObservable),
      ]);

      console.log('etherchain >>: ', etherchain.data);
      console.log('ethplorer >>:', ethplorer.data.publicTags);
    })();

    return 'Hello World!';
  }

  healthCheck(): string {
    return 'Up and Running...';
  }
}
