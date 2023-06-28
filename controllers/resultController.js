const Result = require('../models/Result');
const User = require('../models/User');
const Exam = require('../models/Exam');

async function postResult(req, res) {
  try {
    const { studentId, examId, score } = req.body;

    // Check if the student and exam exist
    const student = await User.findByPk(studentId);
    const exam = await Exam.findByPk(examId);
    if (!student || !exam) {
      return res.status(404).json({ message: 'Student or exam not found' });
    }

    // Add the result
    const result = await Result.create({
      studentId,
      examId,
      score,
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error('Error during result addition:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateResult(req, res) {
  try {
    const { resultId } = req.params;
    const { score } = req.body;

    // Check if the result exists
    const result = await Result.findByPk(resultId);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    // Update the result
    result.score = score;

    await result.save();

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error during result update:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteResult(req, res) {
  try {
    const { resultId } = req.params;

    // Check if the result exists
    const result = await Result.findByPk(resultId);
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    // Delete the result
    await result.destroy();

    return res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    console.error('Error during result deletion:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllResults(req, res) {
  try {
    // Get all results with student and exam details
    const results = await Result.findAll({
      include: [
        { model: User, as: 'student' },
        { model: Exam, as: 'exam' },
      ],
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error during result retrieval:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  postResult,
  updateResult,
  deleteResult,
  getAllResults,
};
