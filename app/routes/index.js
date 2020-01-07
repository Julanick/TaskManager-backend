const taskRoutes = require('./task_routes');
const dayRoutes = require('./day_routes');
module.exports = function(app, db) {
    taskRoutes(app, db);
    dayRoutes(app, db);
};