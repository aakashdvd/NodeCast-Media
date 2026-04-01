// @ts-check
//
//  Created by aakashdvd on 24/11/28.
//  dwivediaakash2000@gmail.com
//  Copyright (c) 2025 aakashdvd. All rights reserved.
//

const EventEmitter = require("node:events");

const Context = {
  config: {},

  sessions: new Map(),

  broadcasts: new Map(),

  eventEmitter: new EventEmitter()
};

module.exports = Context;
