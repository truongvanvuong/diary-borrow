import Diary from '../Models/Diary.js';

const createDiary = async (req, res) => {
  const newDiary = new Diary(req.body);

  try {
    const savedDiary = await newDiary.save();
    res.status(200).json({
      success: true,
      data: savedDiary,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

const getDiaryLoan = async (req, res) => {
  try {
    const DiaryLoan = await Diary.find({ loan: true });
    res.status(200).json({
      success: true,
      data: DiaryLoan,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};
const getDiaryBorrow = async (req, res) => {
  try {
    const DiaryBorrow = await Diary.find({ borrow: true });
    res.status(200).json({
      success: true,
      data: DiaryBorrow,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};
const getSingleDiary = async (req, res) => {
  const id = req.params.id;
  try {
    const singleDiary = await Diary.findById(id);
    res.status(200).json({
      success: true,
      data: singleDiary,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};
const getAllDiary = async (req, res) => {
  try {
    const allDiarys = await Diary.find({});
    res.status(200).json({
      success: true,
      data: allDiarys,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};
const updateDiary = async (req, res) => {
  const id = req.params.id;
  try {
    const updateDiary = await Diary.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: updateDiary,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};
const deleteDiary = async (req, res) => {
  const id = req.params.id;
  try {
    await Diary.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};
export {
  createDiary,
  getDiaryLoan,
  getSingleDiary,
  getDiaryBorrow,
  getAllDiary,
  updateDiary,
  deleteDiary,
};
