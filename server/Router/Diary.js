import express from 'express';
import {
  createDiary,
  getAllDiary,
  getDiaryLoan,
  getDiaryBorrow,
  updateDiary,
  deleteDiary,
  deleteDiarys,
  getSingleDiary,
} from '../Controllers/DiaryController.js';

const router = express.Router();

router.get('/', getAllDiary);
router.get('/loan', getDiaryLoan);
router.get('/borrow', getDiaryBorrow);
router.delete('/delete-diaries', deleteDiarys);
router.get('/:id', getSingleDiary);
router.post('/', createDiary);
router.put('/:id', updateDiary);
router.delete('/:id', deleteDiary);
export default router;
