const router = require("express").Router();
const thoughtsRoutes = require("./thoughts-routes");
const usersRoutes = require("./users-routes");

router.use("/thoughts", thoughtsRoutes);
router.use("/users", usersRoutes);

module.exports = router;