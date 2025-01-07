const Score = require("../models/scoreModel");
const catchAsync = require("./../../utils/catchAsync");
const AppError = require("./../../utils/appError");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const Chart = require("chart.js");

const subjects = [
  "english",
  "hindi",
  "telugu",
  "mathematics",
  "science",
  "socialStudies",
];

exports.getScore = catchAsync(async (req, res, next) => {
  const { acadYear, rollno, class: studentClass } = req.params;

  const score = await Score.findOne({
    acadYear,
    rollNo: rollno,
    class: studentClass,
  });

  if (!score) {
    return next(new AppError("No score found for this student!", 404));
  }

  const calculatePercentage = (subjectScores) => {
    let totalMarks = 0;
    let totalMaxMarks = 0;

    subjectScores.forEach((subject) => {
      subject.assignments.forEach((assignment) => {
        totalMarks += assignment.score;
        totalMaxMarks += assignment.marks;
      });

      subject.tests.forEach((test) => {
        totalMarks += test.score;
        totalMaxMarks += test.marks;
      });
    });

    const percentage = ((totalMarks / totalMaxMarks) * 100).toFixed(2);
    return { totalMarks, totalMaxMarks, percentage };
  };

  const subjectScores = [
    score.english,
    score.hindi,
    score.telugu,
    score.mathematics,
    score.science,
    score.socialStudies,
  ];

  const { totalMarks, totalMaxMarks, percentage } =
    calculatePercentage(subjectScores);

  let grade;
  if (percentage >= 90) {
    grade = "A+";
  } else if (percentage >= 80) {
    grade = "A";
  } else if (percentage >= 70) {
    grade = "B+";
  } else if (percentage >= 60) {
    grade = "B";
  } else if (percentage >= 50) {
    grade = "C+";
  } else if (percentage >= 40) {
    grade = "C";
  } else {
    grade = "F";
  }

  const classScores = await Score.find({ acadYear, class: studentClass });

  classScores.sort((a, b) => {
    const percentageA = calculatePercentage([
      a.english,
      a.hindi,
      a.telugu,
      a.mathematics,
      a.science,
      a.socialStudies,
    ]).percentage;
    const percentageB = calculatePercentage([
      b.english,
      b.hindi,
      b.telugu,
      b.mathematics,
      b.science,
      b.socialStudies,
    ]).percentage;

    return percentageB - percentageA;
  });

  const rank = classScores.findIndex((student) => student.rollNo == rollno) + 1;

  res.status(200).json({
    status: "success",
    data: {
      overallPercentage: percentage,
      grade,
      totalMarks,
      totalMaxMarks,
      classRank: rank,
      studentInfo: score,
    },
  });
});

exports.getsubwiseperformance = catchAsync(async (req, res, next) => {
  const { acadYear, rollno, class: studentClass } = req.params;

  const score = await Score.findOne({
    acadYear,
    rollNo: rollno,
    class: studentClass,
  });

  if (!score) {
    return next(new AppError("No score found for this student!", 404));
  }

  const calculatePercentage = (subject) => {
    let totalMarks = 0;
    let totalMaxMarks = 0;

    subject[0].assignments.forEach((assignment) => {
      totalMarks += assignment.score;
      totalMaxMarks += assignment.marks;
    });

    subject[0].tests.forEach((test) => {
      totalMarks += test.score;
      totalMaxMarks += test.marks;
    });

    return ((totalMarks / totalMaxMarks) * 100).toFixed(2);
  };

  const percentages = subjects.map((subject) => {
    const percentage = calculatePercentage([score[subject]]);
    return percentage;
  });

  const labels = subjects.map(
    (subject) => subject.charAt(0).toUpperCase() + subject.slice(1)
  );
  const data = percentages;
  console.log(percentages);

  const width = 400;
  const height = 400;

  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const chartConfig = {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Subject-wise Performance",
          data: percentages,
          backgroundColor: [
            "#FF5733",
            "#33FF57",
            "#3357FF",
            "#FF33A1",
            "#FFC300",
            "#8E44AD",
          ],
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    },
  };

  const image = await chartJSNodeCanvas.renderToDataURL(chartConfig);

  res.status(200).json({
    status: "success",
    data: {
      subjectWisePerformance: image,
    },
  });
});

exports.performanceAnalysis = catchAsync(async (req, res, next) => {
  const { acadYear, rollno, class: studentClass } = req.params;

  const student = await Score.findOne({
    rollNo: rollno,
    acadYear,
    class: studentClass,
  });

  if (!student) {
    return next(new AppError("No score found for this student!", 404));
  }

  const assignmentScores = [];
  const testScores = [];

  subjects.forEach((subject) => {
    const assignmentScore =
      student[subject]?.assignments.reduce((acc, cur) => acc + cur.score, 0) ||
      0;
    const testScore =
      student[subject]?.tests.reduce((acc, cur) => acc + cur.score, 0) || 0;
    assignmentScores.push(assignmentScore);
    testScores.push(testScore);
  });

  const width = 800;
  const height = 600;

  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const chartConfiguration = {
    type: "bar",
    data: {
      labels: subjects.map(
        (subject) => subject.charAt(0).toUpperCase() + subject.slice(1)
      ),
      datasets: [
        {
          label: "Assignments",
          data: assignmentScores,
          backgroundColor: "#3357FF",
        },
        {
          label: "Tests",
          data: testScores,
          backgroundColor: "#33FF57",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `${tooltipItem.raw}`,
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Subjects",
          },
        },
        y: {
          title: {
            display: true,
            text: "Scores",
          },
          beginAtZero: true,
        },
      },
    },
  };

  const image = await chartJSNodeCanvas.renderToDataURL(chartConfiguration);

  res.status(200).json({
    status: "success",
    data: {
      performanceAnalysisImage: image,
    },
  });
});
