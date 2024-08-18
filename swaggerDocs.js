
//Auth

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentications
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Create a new user account using an email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation errors
 */

/**
 * @swagger
 * /verifyemail:
 *   post:
 *     tags: [Auth]
 *     summary: Verify user email
 *     description: Verify a user's email address using a verification code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               verificationCode:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Verification failed or invalid code
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: User login
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized, invalid credentials
 */

/**
 * @swagger
 * /forgetpassword:
 *   post:
 *     tags: [Auth]
 *     summary: Forgot password
 *     description: Request a password reset email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Invalid email address
 */

/**
 * @swagger
 * /verifycode:
 *   post:
 *     tags: [Auth]
 *     summary: Verify reset code
 *     description: Verify the code sent to the user's email for password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Code verified successfully
 *       400:
 *         description: Invalid or expired code
 */

/**
 * @swagger
 * /resetpassword:
 *   patch:
 *     tags: [Auth]
 *     summary: Reset password
 *     description: Reset the user's password using a valid reset code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired reset code
 */


// User

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [User]
 *     summary: Retrieve all users
 *     description: Fetch a list of all users. Accessible only to admins.
 *     responses:
 *       200:
 *         description: A list of users.
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /account/{userId}:
 *   get:
 *     tags: [User]
 *     summary: Get user by ID
 *     description: Fetch a user’s details by their ID. Accessible only to admins.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b8d6f2c8b7d93b3a56d431
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /search:
 *   get:
 *     tags: [User]
 *     summary: Search users
 *     description: Search for users based on query parameters. Accessible only to admins.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: John
 *     responses:
 *       200:
 *         description: Search results
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /update/{userId}:
 *   put:
 *     tags: [User]
 *     summary: Update user by ID
 *     description: Update user details by their ID. Accessible only to admins.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b8d6f2c8b7d93b3a56d431
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /delete/{userId}:
 *   delete:
 *     tags: [User]
 *     summary: Delete user by ID
 *     description: Delete a user by their ID. Accessible only to admins.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b8d6f2c8b7d93b3a56d431
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /profiledata:
 *   get:
 *     tags: [User]
 *     summary: Get current user's profile data
 *     description: Retrieve the profile data for the currently logged-in user. Accessible only to authenticated users.
 *     responses:
 *       200:
 *         description: User profile data retrieved successfully
 *       401:
 *         description: Unauthorized, user must be authenticated
 */

/**
 * @swagger
 * /updateprofile:
 *   put:
 *     tags: [User]
 *     summary: Update current user's profile data
 *     description: Update the profile data for the currently logged-in user. Accessible only to authenticated users.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized, user must be authenticated
 */

/**
 * @swagger
 * /updatepassword:
 *   patch:
 *     tags: [User]
 *     summary: Update user's password
 *     description: Update the password for the currently logged-in user. Accessible only to authenticated users.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: OldPassword123
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid current password or new password
 *       401:
 *         description: Unauthorized, user must be authenticated
 */

/**
 * @swagger
 * /deleteaccount:
 *   delete:
 *     tags: [User]
 *     summary: Delete current user's account
 *     description: Permanently delete the account of the currently logged-in user. Accessible only to authenticated users.
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       401:
 *         description: Unauthorized, user must be authenticated
 */


// Programs

/**
 * @swagger
 * tags:
 *   name: Programs
 *   description: Program management
 */

/**
 * @swagger
 * /programs:
 *   post:
 *     tags: [Programs]
 *     summary: Add a new program
 *     description: Create a new program entry. Requires multiple image file uploads and admin authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               name:
 *                 type: string
 *                 example: "Adventure Program"
 *               description:
 *                 type: string
 *                 example: "An exciting adventure program"
 *               location:
 *                 type: string
 *                 example: "Mountain Range"
 *     responses:
 *       201:
 *         description: Program added successfully
 *       400:
 *         description: Validation errors or file upload issues
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /programs:
 *   get:
 *     tags: [Programs]
 *     summary: Retrieve all programs
 *     description: Fetch a list of all programs.
 *     responses:
 *       200:
 *         description: A list of programs
 *       400:
 *         description: Validation errors
 */

/**
 * @swagger
 * /programs/single/{programId}:
 *   get:
 *     tags: [Programs]
 *     summary: Get program by ID
 *     description: Retrieve the details of a specific program by its ID.
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     responses:
 *       200:
 *         description: Program details retrieved successfully
 *       400:
 *         description: Validation errors
 *       404:
 *         description: Program not found
 */

/**
 * @swagger
 * /programs/{programId}:
 *   put:
 *     tags: [Programs]
 *     summary: Update program details
 *     description: Update the details of an existing program. Requires admin authentication.
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Program Name"
 *               description:
 *                 type: string
 *                 example: "Updated description of the program"
 *               location:
 *                 type: string
 *                 example: "New Location"
 *     responses:
 *       200:
 *         description: Program updated successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Program not found
 */

/**
 * @swagger
 * /programs/{programId}:
 *   delete:
 *     tags: [Programs]
 *     summary: Delete a program
 *     description: Delete a program by its ID. Requires admin authentication.
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     responses:
 *       200:
 *         description: Program deleted successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Program not found
 */

/**
 * @swagger
 * /programs/schedule/{programId}:
 *   post:
 *     tags: [Programs]
 *     summary: Add a schedule to a program
 *     description: Add a schedule entry to a program. Requires admin authentication.
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2024-08-20"
 *               time:
 *                 type: string
 *                 format: time
 *                 example: "10:00 AM"
 *     responses:
 *       201:
 *         description: Schedule added successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /programs/schedule/{programId}:
 *   delete:
 *     tags: [Programs]
 *     summary: Delete all schedules for a program
 *     description: Delete all schedules associated with a program by its ID. Requires admin authentication.
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     responses:
 *       200:
 *         description: All schedules deleted successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Program not found
 */


// Activities

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: Activities management
 */

/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Add a new activity
 *     description: Allows an admin to add a new activity with an image.
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               coverImg:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *                 example: "Yoga Class"
 *               description:
 *                 type: string
 *                 example: "A relaxing yoga session."
 *     responses:
 *       201:
 *         description: Activity created successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Retrieve all activities
 *     description: Fetch a list of all activities.
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: A list of activities
 *       400:
 *         description: Validation errors
 */

/**
 * @swagger
 * /activities/single/{activityId}:
 *   get:
 *     summary: Retrieve an activity by ID
 *     description: Get details of a specific activity by its ID.
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     responses:
 *       200:
 *         description: Activity details
 *       400:
 *         description: Validation errors
 *       404:
 *         description: Activity not found
 */

/**
 * @swagger
 * /activities/{activityId}:
 *   put:
 *     summary: Update an activity
 *     description: Allows an admin to update details of an activity by its ID.
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Advanced Yoga Class"
 *               description:
 *                 type: string
 *                 example: "An advanced level yoga session."
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Activity not found
 */

/**
 * @swagger
 * /activities/{activityId}:
 *   delete:
 *     summary: Delete an activity
 *     description: Allows an admin to delete an activity by its ID.
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     responses:
 *       200:
 *         description: Activity deleted successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Activity not found
 */


// Photos

/**
 * @swagger
 * tags:
 *   name: Photos
 *   description: Photos management
 */

/**
 * @swagger
 * /photos:
 *   post:
 *     summary: Add a new photo
 *     description: Upload a new photo. Only admins can perform this action.
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *                 example: "Sunset"
 *     responses:
 *       201:
 *         description: Photo added successfully
 *       400:
 *         description: Validation errors or file upload issues
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /photos:
 *   get:
 *     summary: Retrieve all photos
 *     description: Fetch a list of all photos.
 *     tags: [Photos]
 *     responses:
 *       200:
 *         description: A list of photos
 *       400:
 *         description: Validation errors
 */

/**
 * @swagger
 * /photos/{photoId}:
 *   delete:
 *     summary: Delete a photo
 *     description: Delete a photo by its ID. Only admins can perform this action.
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     responses:
 *       200:
 *         description: Photo deleted successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Photo not found
 */


// Restaurants

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Restaurant management
 */

/**
 * @swagger
 * /restaurants:
 *   post:
 *     tags: [Restaurants]
 *     summary: Add a new restaurant
 *     description: Create a new restaurant entry. Requires an image file upload and admin authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               coverImg:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *                 example: "Fancy Restaurant"
 *               location:
 *                 type: string
 *                 example: "123 Restaurant Street"
 *               description:
 *                 type: string
 *                 example: "A description of the restaurant"
 *     responses:
 *       201:
 *         description: Restaurant added successfully
 *       400:
 *         description: Validation errors or file upload issues
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /restaurants:
 *   get:
 *     tags: [Restaurants]
 *     summary: Retrieve all restaurants
 *     description: Fetch a list of all restaurants.
 *     responses:
 *       200:
 *         description: A list of restaurants
 *       400:
 *         description: Validation errors
 */

/**
 * @swagger
 * /restaurants/single/{restaurantId}:
 *   get:
 *     tags: [Restaurants]
 *     summary: Get restaurant by ID
 *     description: Retrieve the details of a specific restaurant by its ID.
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b8d6f2c8b7d93b3a56d431
 *     responses:
 *       200:
 *         description: Restaurant details retrieved successfully
 *       400:
 *         description: Validation errors
 *       404:
 *         description: Restaurant not found
 */

/**
 * @swagger
 * /restaurants/{restaurantId}:
 *   put:
 *     tags: [Restaurants]
 *     summary: Update restaurant details
 *     description: Update the details of an existing restaurant. Requires admin authentication.
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b8d6f2c8b7d93b3a56d431
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Restaurant Name"
 *               location:
 *                 type: string
 *                 example: "456 New Street"
 *               description:
 *                 type: string
 *                 example: "Updated description of the restaurant"
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Restaurant not found
 */

/**
 * 
 * 
 * @swagger
 * /restaurants/{restaurantId}:
 *   delete:
 *     tags: [Restaurants]
 *     summary: Delete a restaurant
 *     description: Delete a restaurant by its ID. Requires admin authentication.
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b8d6f2c8b7d93b3a56d431
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Restaurant not found
 */


// Shops

/**
 * @swagger
 * tags:
 *   name: Shops
 *   description: Shops management
 */

/**
 * @swagger
 * /shops:
 *   post:
 *     summary: Add a new shop
 *     description: Allows an admin to add a new shop, including a cover image.
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               coverImg:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *                 example: "Local Cafe"
 *               description:
 *                 type: string
 *                 example: "A cozy local cafe offering a variety of beverages."
 *     responses:
 *       201:
 *         description: Shop added successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /shops:
 *   get:
 *     summary: Retrieve all shops
 *     description: Fetch a list of all shops.
 *     tags: [Shops]
 *     responses:
 *       200:
 *         description: A list of shops
 *       400:
 *         description: Validation errors
 */

/**
 * @swagger
 * /shops/single/{shopId}:
 *   get:
 *     summary: Retrieve a shop by ID
 *     description: Get details of a specific shop by its ID.
 *     tags: [Shops]
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     responses:
 *       200:
 *         description: Shop details
 *       400:
 *         description: Validation errors
 *       404:
 *         description: Shop not found
 */

/**
 * @swagger
 * /shops/{shopId}:
 *   put:
 *     summary: Update a shop
 *     description: Allows an admin to update details of a shop by its ID.
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Shop Name"
 *               description:
 *                 type: string
 *                 example: "Updated description of the shop."
 *     responses:
 *       200:
 *         description: Shop updated successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Shop not found
 */

/**
 * @swagger
 * /shops/{shopId}:
 *   delete:
 *     summary: Delete a shop
 *     description: Allows an admin to delete a shop by its ID.
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shopId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     responses:
 *       200:
 *         description: Shop deleted successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Shop not found
 */


// Bookings

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Booking management
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     description: Allows users and admins to add a new book.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Introduction to Programming"
 *               author:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: Book added successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, user or admin privileges required
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     description: Fetch a list of all books. Accessible by users and admins.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of books
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, user or admin privileges required
 */

/**
 * @swagger
 * /books/{bookId}:
 *   patch:
 *     summary: Cancel a book
 *     description: Allows users and admins to cancel a book by its ID.
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     responses:
 *       200:
 *         description: Book canceled successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, user or admin privileges required
 *       404:
 *         description: Book not found
 */


// Wishlist

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Wishlist management
 */

/**
 * @swagger
 * /wishlist/{programId}:
 *   post:
 *     summary: Add a program to the wishlist
 *     description: Allows an admin to add a program to the wishlist by its ID.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     responses:
 *       201:
 *         description: Program added to wishlist successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Program not found
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Retrieve all programs in the wishlist
 *     description: Allows an admin to fetch all programs added to the wishlist.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of programs in the wishlist
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 */

/**
 * @swagger
 * /wishlist/{programId}:
 *   delete:
 *     summary: Delete a program from the wishlist
 *     description: Allows an admin to remove a program from the wishlist by its ID.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *           example: "60b8d6f2c8b7d93b3a56d432"
 *     responses:
 *       200:
 *         description: Program removed from wishlist successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Unauthorized, admin privileges required
 *       404:
 *         description: Program not found
 */


// Reviews

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Program reviews management
 */

/**
 * @swagger
 * /reviews/{programId}:
 *   post:
 *     tags: [Reviews]
 *     summary: Add a review for a program
 *     description: Allows a user to add a review for a specific program.
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b8d6f2c8b7d93b3a56d431
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Great program!"
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user login required
 */

/**
 * @swagger
 * /reviews/{programId}:
 *   get:
 *     tags: [Reviews]
 *     summary: Get all reviews for a program
 *     description: Retrieve all reviews associated with a specific program.
 *     parameters:
 *       - in: path
 *         name: programId
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b8d6f2c8b7d93b3a56d431
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Program not found
 */

/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     tags: [Reviews]
 *     summary: Delete a review
 *     description: Allows a user to delete their review by review ID.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           example: 60b8d6f2c8b7d93b3a56d431
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized, user login required
 *       404:
 *         description: Review not found
 */