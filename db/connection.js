const mongoose = require('mongoose');

// const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zw6hky5.mongodb.net/?retryWrites=true&w=majority`;

const password = encodeURIComponent('Saloni@31');
const mongoURI = `mongodb+srv://victoria1999:${password}@natours-app-cluster.ncri0fg.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log('Connected to DB')).catch((e)=> console.log('Error', e))