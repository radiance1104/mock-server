import * as Express from 'express';

export enum MethodType {
  Get,
  Post,
  Put,
  Delete,
  Patch,
}

export type Route = {
  type: MethodType;
  path: string;
  action: (request: Express.Request, response: Express.Response) => void;
}

export class RouteBase {
  routes(): Route[] {
    return [];
  }

  get(request: any, response: any) {
    response.sendStatus(404);
  }
  post(request: any, response: any) {
    response.sendStatus(404);
  }
  put(request: any, response: any) {
    response.sendStatus(404);
  }
  delete(request: any, response: any) {
    response.sendStatus(404);
  }
  patch(request: any, response: any) {
    response.sendStatus(404);
  }
}
