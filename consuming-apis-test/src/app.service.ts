import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { forkJoin } from 'rxjs';

// [
//   "https://api.agify.io/?name=michael",
//   "https://api.catboys.com/catboy",
//   "https://random.dog/woof.json",
//   "https://zoo-animal-api.herokuapp.com/animals/rand"
// ]

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  private requestBody = {
    testing: 'testing',
  };

  getHello(): any {
    let agify = this.http.get('https://api.agify.io/?name=michael');

    let randomfox = this.http.get('https://randomfox.ca/floof/');

    let catboys = this.http.get('https://api.catboys.com/catboy');

    return forkJoin([agify, randomfox, catboys]).pipe(
      map((response) => {
        return response.map((item) => {
          let url = item.config.url;
          return {
            url: url,
            response: item.data,
          };
        });
      }),
    );
  }

  requestManyUrls(urls: Array<any>): any {
    // let agify = this.http.get('https://api.agify.io/?name=michael');

    // let randomfox = this.http.get('https://randomfox.ca/floof/');

    // let catboys = this.http.get('https://api.catboys.com/catboy');

    let urlsRequests = urls.map((url) => {
      return this.http.get(url);
    });

    // return 'mamacos';

    return forkJoin(urlsRequests).pipe(
      map((response) => {
        return response.map((item) => {
          return {
            url: item.config.url,
            response: item.data,
          };
        });
      }),
    );
  }
}
