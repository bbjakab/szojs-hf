const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jakab', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose;