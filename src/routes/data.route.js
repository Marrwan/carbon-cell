var express = require('express');
const { getLists } = require('../controllers/data.controller');
const validateRequest = require('../middlewares/validation.middleware');
const { APIDTO } = require('../validations/data.validation');
var router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     DataRequest:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           description: Category for filtering the data. Optional.
 *         limit:
 *           type: integer
 *           description: Maximum number of entries to retrieve. Optional.
 *           minimum: 1
 */

/**
 * @swagger
 * /data:
 *   get:
 *     summary: Get data from public API
 *     tags: [Data]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           $ref: '#/components/schemas/DataRequest/properties/category'
 *         description: Category for filtering the data. Optional.
 *       - in: query
 *         name: limit
 *         schema:
 *           $ref: '#/components/schemas/DataRequest/properties/limit'
 *         description: Maximum number of entries to retrieve. Optional.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Number of entries returned
 *                 entries:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       API:
 *                         type: string
 *                         description: Name of the API
 *                       Description:
 *                         type: string
 *                         description: Description of the API
 *                       Auth:
 *                         type: string
 *                         description: Authentication method for the API
 *                       HTTPS:
 *                         type: boolean
 *                         description: Whether the API supports HTTPS
 *                       Cors:
 *                         type: string
 *                         description: CORS policy for the API
 *                       Link:
 *                         type: string
 *                         description: URL link to the API documentation
 *                       Category:
 *                         type: string
 *                         description: Category of the API
 *       400:
 *         description: Invalid request
 */
router.get("/", validateRequest(APIDTO, "query"), getLists)

module.exports = router;
