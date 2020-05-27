const { model, Schema } = require('mongoose')

const GardenSchema = new Schema({
  garden_name: {
   type:  String, 
   required: true
  },
  about: {
    type: String
  },
  location: {
    type: String
  },
  my_garden: {
    type: String
  },
  plants: [{
    type: Object
  }], 
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

module.exports = model('garden', GardenSchema)