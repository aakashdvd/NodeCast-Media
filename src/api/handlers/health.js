// @ts-check
//
//  Created by aakashdvd on 24/11/27.
//  dwivediaakash2000@gmail.com
//  Copyright (c) 2025 aakashdvd. All rights reserved.
//

const logger = require("../../core/logger.js");
const packageInfo = require("../../../package.json");

class HealthHandler {
  /**
   * Health check endpoint
   * @param {express.Request} req
   * @param {express.Response} res
   */
  static check(req, res) {
    try {
      res.json({
        success: true,
        data: {
          status: "ok",
          timestamp: new Date().toISOString(),
          version: packageInfo.version
        },
        message: "Server is healthy"
      });
    } catch (error) {
      logger.error("Health check error:", error);
      res.status(500).json({
        success: false,
        data: {},
        message: "Health check failed"
      });
    }
  }
}

module.exports = HealthHandler;