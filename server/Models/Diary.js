import mongoose from 'mongoose';
const diarySchema = new mongoose.Schema(
  {
    storeName: { type: String },
    item: { type: String },
    quantity: { type: Number },
    unit: { type: String },
    loanDate: { type: Date },
    returnDate: { type: Date },
    returned: { type: Boolean },
    borrow: { type: Boolean },
    loan: { type: Boolean },
  },
  { timestamps: true }
);

export default mongoose.model('Diary', diarySchema);
