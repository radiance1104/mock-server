import * as Joi from 'joi';

import { RouteBase, Route, MethodType } from './route-base';

export class LoginRoute extends RouteBase {
  override routes(): Route[] {
    return [
      { type: MethodType.Get, path: '/api/login', action: this.get },
      { type: MethodType.Post, path: '/api/login', action: this.post },
      { type: MethodType.Delete, path: '/api/login', action: this.delete },
    ]
  }

  override get(request: any, response: any) {
    response.sendStatus(200);
  }

  override post(request: any, response: any) {
    const { error } = Joi.object({
      userId: Joi.string().required(),
      password: Joi.string().required(),
    }).validate(request.body);

    if (error) {
      return response.status(400).json({ error: error.details[0].message });
    }
    response.sendStatus(200);
  }

  override delete(request: any, response: any) {
    response.sendStatus(200);
  }
}
