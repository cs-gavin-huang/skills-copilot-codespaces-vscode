// Create web server application

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// Import database
const db = require('./db');

// Create web server
const app = express();

// Apply middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Create route
app.get('/comments', (req, res) => {
    db.Comment.find({}, 'title description', (error, comments) => {
        if (error) {
        console.error(error);
        }
        res.send({
        comments: comments
        });
    }).sort({_id: -1});
    }
);

app.post('/comments', (req, res) => {
    const dbComment = new db.Comment({
        title: req.body.title,
        description: req.body.description
    });
    dbComment.save((error, comment) => {
        if (error) {
        console.error(error);
        }
        res.send(comment);
    });
}
);

app.delete('/comments/:id', (req, res) => {
    db.Comment.deleteOne(
        { _id: req.params.id },
        (error, comment) => {
        if (error) {
            console.error(error);
        }
        res.send(comment);
        }
    );
    }
);

// Launch web server
app.listen(process.env.PORT || 8081);

