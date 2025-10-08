// import mongoose from 'mongoose';

// const itemSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: [0, 'Price cannot be negative']
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: [0, 'Quantity cannot be negative'],
//     default: 0
//   },
//   image: {
//     type: String,
//     default: ''
//   },
// }, {
//   timestamps: true
// });


// export default mongoose.model('Item', itemSchema);


import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an item name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Other'],
    default: 'Other'
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Please add quantity'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for search functionality
itemSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Item', itemSchema);