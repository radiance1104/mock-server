import * as Express from 'express';
import { MethodType, Route, RouteBase } from './routes/route-base';
import { HealthRoute } from './routes/health';
import { LoginRoute } from './routes/login';

export class Server {
  private routeGroups: RouteBase[] = [];
  private port: number;
  private app: Express.Application;

  constructor(port: number) {
    this.port = port;
  }

  /**
   * Expressサーバを起動
   */
  start() {
    this.app = Express();
    this.app.listen(this.port, () => {
      console.info(`listening to port: ${this.port}`);
    });
    // this.app.use((request, response, next) => {
    //   response.header('Access-Control-Allow-Origin', '*');
    //   response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //   response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // });
    this.app.use(Express.json());
    this.app.use(Express.urlencoded({ extended: true }));

    this.initRoutes();
    this.routeGroups.forEach((routeGroup: RouteBase) => {
      routeGroup.routes().forEach((route: Route) => {
        switch (route.type) {
          case MethodType.Get:
            this.app.get(route.path, route.action);
            break;
          case MethodType.Post:
            this.app.post(route.path, route.action);
            break;
          case MethodType.Put:
            this.app.put(route.path, route.action);
            break;
          case MethodType.Delete:
            this.app.delete(route.path, route.action);
            break;
          case MethodType.Patch:
            this.app.patch(route.path, route.action);
            break;
        }
      });
    });
  }

  /**
   * ルートの初期化
   */
  private initRoutes() {
    this.routeGroups.push(new HealthRoute());
    this.routeGroups.push(new LoginRoute());
  }
}
