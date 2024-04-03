var express = require('express');
const { isLogin } = require("../middlewares/auth.middleware");
const { getMessage } = require("../controllers/message.controller");

let router = express.Router();


/**
 * @swagger
 * /message:
 *   get:
 *     summary: Retrieve a personalized message for authenticated users
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Personalized message for the authenticated user
 *                   example: "Hello John, Welcome! You are able to view this because you are logged in. Your email is john@example.com. You can logout and try accessing this endpoint"
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized, You need to login to access these resources"
 *          
 */
router.get('/', isLogin, getMessage);

module.exports = router;