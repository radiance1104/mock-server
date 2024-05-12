import { RouteBase, Route, MethodType } from "./route-base";

export class HealthRoute extends RouteBase {
  override routes(): Route[] {
    return [
      { type: MethodType.Get, path: '/api/health', action: this.get },
    ]
  }

  override get(request: any, response: any) {
    response.sendStatus(200);
  }
}
