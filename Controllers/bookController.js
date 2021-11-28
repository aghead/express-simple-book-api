const bookController = (Book) => {

    const post = (req, res) => {
        let book = new Book(req.body)

        if (!req.body.title) {
            res.status(400)
            res.send('title is required')
        } else {
            book.save()
            res.status(201)
            res.send(book)
        }

    }

    const get = (req, res) => {

        // check query string
        let query = {}

        if (req.query.genre) {
            query.genre = req.query.genre
        }

        // then find the books
        Book.find(query, (err, books) => {
            if (err)
                res.status(500).send(err)
            else
                res.json(books)
        })
    }

    return {
        post: post,
        get: get
    }
}

module.exports = bookController;