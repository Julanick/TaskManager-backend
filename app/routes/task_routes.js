var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, client) {
    var db = client.db('TaskManagerDB');
    app.get('/tasks/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('tasks').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred on DB' });
            } else {
                res.send(item);
            }
        });
    });

    app.post('/tasks', (req, res) => {
        const task = {
            title: req.body.title || null,
            text: req.body.text || null,
            status: req.body.status || null,
            urgency: req.body.urgency || null,
            date: req.body.date ? new Date(req.body.date) : new Date(),
        };
        db.collection('tasks').insert(task, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred on DB' });
            } else {
                res.send(result.ops[0]._id);
            }
        });
    });

    app.delete('/tasks/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('tasks').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred on DB' });
            } else {
                res.send('task ' + id + ' deleted!');
            }
        });
    });

    app.put('/tasks/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const task = {
            title: req.body.title || null,
            text: req.body.text || null,
            status: req.body.status || null,
            urgency: req.body.urgency || null,
            date: req.body.date ? new Date(req.body.date) : new Date(),
        };
        db.collection('tasks').update(details, task, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred on DB' });
            } else {
                res.send(task);
            }
        });
    });
};