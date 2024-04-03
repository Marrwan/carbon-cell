var express = require('express');
const validateRequest = require('../middlewares/validation.middleware');
const { registerDto, loginDto, tokenDto } = require('../validations/auth.validation');
const { register, login, logout, refreshToken } = require('../controllers/auth.controller');
const { isLogin } = require('../middlewares/auth.middleware');
var router = express.Router();


/**
 * @swagger
 * components:
*  schemas:
*    RegisterRequest:
*      type: object
*      required:
*        - email
*        - password
*      properties:
*        email:
*          type: string
*          description: Email address of the user
*          format: email
*          example: user@mail.com
*        password:
*          type: string
*          description: Password for the user account (at least 6 characters)
*          minLength: 6
*          writeOnly: true  # Hide password in response
*        name:
*          type: string
*          description: Full name of the user (optional)
*          example: Afnaan DhuNurayn
*
*  securitySchemes:
*    bearerAuth:
*      type: http
*      scheme: bearer
*      bearerFormat: JWT  # Indicate JWT format for token
*
*security:
*  - bearerAuth: []
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided email and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: Password for the user account (at least 6 characters).
 *               name:
 *                 type: string
 *                 description: Full name of the user (optional).
 *             example:
 *               email: user@mail.com
 *               password: Password123
 *               name: John Doe
 *             required:
 *                 - email
 *                 - password
 *     responses:
 *       '201':
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the newly registered user.
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email address of the newly registered user.
 *                 password:
 *                     type: string
 *                     description: Password is not included in the response for security reasons.
 *                 name:
 *                   type: string
 *                   description: Full name of the newly registered user.
 *                 updatedAt:
 *                     type: date-time
 *                 createdAt:
 *                     type: date-time
 *               example:
 *                 id: 19
 *                 email: Elnora9@hotmail.com
 *                 password: null
 *                 name: Afnaan
 *                 updatedAt: "2024-04-02T20:30:58.709Z"
 *                 createdAt: "2024-04-02T20:30:58.709Z"
 *       '400':
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for the invalid request.
 *             example:
 *               error: Email should be a valid mail format.
 *       '409':
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user already exists.
 *             example:
 *               error: 🙄 A user already exists with the specified email.
 */
router.post('/register', validateRequest(registerDto), register)

/**
 * @swagger
 * components:
*  schemas:
*    LoginRequest:
*      type: object
*      required:
*        - email
*        - password
*      properties:
*        email:
*          type: string
*          description: User's email address
*          format: email
*          example: user@mail.com
*        password:
*          type: string
*          description: User's password
*          minLength: 6
*          writeOnly: true  # Hide password in response
*
*  securitySchemes:
*    bearerAuth:
*      type: http
*      scheme: bearer
*      bearerFormat: JWT  # Indicate JWT format for token
*
*security:
*  - bearerAuth: []
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: Password for the user account (at least 6 characters).
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginRequest'
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID of the authenticated user.
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: Email address of the authenticated user.
 *                     name:
 *                       type: string
 *                       description: Full name of the authenticated user.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time when the user account was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time when the user account was last updated.
 *                 access_token:
 *                   type: string
 *                   description: JSON Web Token (JWT) for accessing protected resources.
 *         examples:
 *           application/json:
 *             user:
 *               id: 1
 *               email: user@mail.com
 *               name: John Doe
 *               createdAt: "2024-04-02T20:30:58.709Z"
 *               updatedAt: "2024-04-02T20:30:58.709Z"
 *             access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9obiBEb2UifSwiaWF0IjoxNjM1NDg3MDU3LCJleHAiOjE2MzU0OTM0NTd9.D4GG1aXuWAbibM9sTRe2P2SfwZGkMqEnkN_RuZ8J3yo
 *       '400':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the provided credentials are invalid.
 *             example:
 *               error: Invalid Credentials.
 */
router.post('/login', validateRequest(loginDto), login)

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: User logout
 *     description: Invalidate the user's access token to perform a logout.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message indicating successful logout.
 *             example:
 *               message: Logout Successful
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating unauthorized access.
 *             example:
 *               message: Unauthorized
 */
router.get('/logout', isLogin, logout)

/**
 * @swagger
 * components:
*  schemas:
*    RefreshTokenRequest:
*      type: object
*      required:
*        - token
*      properties:
*        token:
*          type: string
*          description: Refresh token to generate a new access token.
*          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9obiBEb2UifSwiaWF0IjoxNjM1NDg3MDU3LCJleHAiOjE2MzU0OTM0NTd9.D4GG1aXuWAbibM9sTRe2P2SfwZGkMqEnkN_RuZ8J3yo
 * /auth/token/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Generate a new access token using the refresh token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       description: Refresh token data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Refresh token to generate a new access token.
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9obiBEb2UifSwiaWF0IjoxNjM1NDg3MDU3LCJleHAiOjE2MzU0OTM0NTd9.D4GG1aXuWAbibM9sTRe2P2SfwZGkMqEnkN_RuZ8J3yo
 *     responses:
 *       '200':
 *         description: New access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: New access token.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9obiBEb2UifSwiaWF0IjoxNjM1NDg3MDU3LCJleHAiOjE2MzU0OTM0NTd9.D4GG1aXuWAbibM9sTRe2P2SfwZGkMqEnkN_RuZ8J3yo
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for the bad request.
 *             example:
 *               message: Invalid refresh token format.
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating unauthorized access or invalid token.
 *             example:
 *               message: Unauthorized
 */
router.post('/token/refresh', validateRequest(tokenDto), refreshToken)

router.post("/p", isLogin, (req,res)=> res.send("Passed"))
module.exports = router;
