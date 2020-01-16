var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, dbClient) {
    var database = dbClient.db('TaskManagerDB');
    app.get('/tasks/:id', (request, response) => {
        response.setHeader('Access-Control-Allow-Origin', '*');
        const id = request.params.id;
        const details = { '_id': new ObjectID(id) };
        database.collection('tasks').findOne(details, function(err, item) {
            if (err) {
                response.send({ 'error': 'An error has occurred on DB' });
            } else {
                response.send(item);
            }
        });
    });

    app.post('/tasks', function(request, response) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        const taskToCreate = {
            title: request.body.title,
            text: request.body.text,
            status: request.body.status,
            urgency: request.body.urgency,
            date: request.body.date
        };
        database.collection('tasks').insert(taskToCreate, function(err, result) {
            if (err) {
                response.send({ 'error': 'An error has occurred on DB' });
            } else {
                response.send(result.ops[0]._id);
            }
        });
    });

    app.delete('/tasks/:id', function(request, response) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        const id = request.params.id;
        const details = { '_id': new ObjectID(id) };
        database.collection('tasks').remove(details, function(err, item) {
            if (err) {
                response.send({ 'error': 'An error has occurred on DB' });
            } else {
                response.send('task ' + id + ' deleted!');
            }
        });
    });

    app.put('/tasks/:id', function(request, response) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        const id = request.params.id;
        const details = { '_id': new ObjectID(id) };
        const updatedToTask = {
            title: request.body.title,
            text: request.body.text,
            status: request.body.status,
            urgency: request.body.urgency,
            date: request.body.date
        };
        database.collection('tasks').update(details, updatedToTask, function(err, result) {
            if (err) {
                response.send({ 'error': 'An error has occurred on DB' });
            } else {
                response.send(updatedToTask);
            }
        });
    });
};