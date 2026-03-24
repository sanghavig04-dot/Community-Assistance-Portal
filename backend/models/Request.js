import mongoose from 'mongoose';
const ResponseSchema = new mongoose.Schema({
  volunteerName: String,
  volunteerContact: String,
  message: String,
  respondedAt: { type: Date, default: Date.now }
}, { _id: false });
const RequestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  requesterName: String,
  phone: String,
  need: String,
  location: String,
  details: String,
  image: String,
  status: { type: String, enum: ['Pending','Accepted','Completed'], default: 'Pending' },
  responses: [ResponseSchema],
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Request', RequestSchema);
