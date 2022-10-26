const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/crmdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('established a connection to the databse'))
    .catch(err => console.log('something went wrong' , err))