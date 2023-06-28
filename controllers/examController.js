const Exam = require('../models/Exam');

async function postExam(req, res) {
  try {
    const { name, date } = req.body;

    // Create the exam
    const exam = await Exam.create({
      name,
      date,
    });

    return res.status(201).json(exam);
  } catch (error) {
    console.error('Error during exam creation:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateExam(req, res) {
  try {
    const { examId } = req.params;
    const { name, date } = req.body;

    // Check if the exam exists
    const exam = await Exam.findByPk(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Update exam details
    exam.name = name;
    exam.date = date;

    await exam.save();

    return res.status(200).json(exam);
  } catch (error) {
    console.error('Error during exam update:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteExam(req, res) {
  try {
    const { examId } = req.params;

    // Check if the exam exists
    const exam = await Exam.findByPk(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Delete the exam
    await exam.destroy();

    return res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    console.error('Error during exam deletion:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const getExam = async (req, res) => {
  let exam = await Exam.findAll({});
  res.status(200).send(exam);
};

module.exports = {
    postExam,
  updateExam,
  deleteExam,
  getExam,
};
