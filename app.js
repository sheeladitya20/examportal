const express = require('express');
const app = express();
const authRoutes = require('./routes/authRouter');
const userRoutes = require('./routes/userRouter');
const examRoutes = require('./routes/examRouter');
const resultRoutes = require('./routes/resultRouter');

app.use(express.json());


app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/exams', examRoutes); 
app.use('/results', resultRoutes);

// Start the server
app.listen(4545, () => {
  console.log('Server started on port 4545');
});
