const should = require('should'),
    request = require('supertest'),
    app = ('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app)

describe('Book crud Test:', function () {
    it('should allow a book to be posted and return a red and _id ', function () {
        var bookPost = {
            title: 'new book',
            author: 'john',
            genre: 'Fiction'
        }

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end(function (err, results) {
                results.body.read.should.equal(false)
                results.body.should.have.property('_id')
                done()
            })
    });

    afterEach(function (done) {
        Book.remove().exec()
        done()
    })
})
