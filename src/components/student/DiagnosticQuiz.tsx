import { useState, useMemo } from 'react';
import { QuizQuestion, QuizResult } from '@/types/learning';
import { generateRandomQuiz, getRandomFeedback } from '@/data/quizData';
import { calculateLearningLevel } from '@/lib/learningUtils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Brain, Target, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagnosticQuizProps {
  onComplete: (result: QuizResult) => void;
}

const QUIZ_SIZE = 10;

export function DiagnosticQuiz({ onComplete }: DiagnosticQuizProps) {
  // Generate random quiz questions on component mount
  const quizQuestions = useMemo(() => generateRandomQuiz(QUIZ_SIZE), []);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswered(true);
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    // Auto-advance after showing feedback
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const calculateFinalResult = (): QuizResult => {
    const score = answers.reduce((acc, ans, idx) => {
      return acc + (ans === quizQuestions[idx].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return {
      score,
      totalQuestions: quizQuestions.length,
      percentage,
      learningLevel: calculateLearningLevel(percentage),
      answers
    };
  };

  const restartQuiz = () => {
    window.location.reload(); // This will generate new random questions
  };

  // Review Screen - shows all answers
  if (showReview) {
    const result = calculateFinalResult();
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-foreground">
              Quiz Review
            </h2>
            <Button variant="outline" size="sm" onClick={() => setShowReview(false)}>
              Back to Results
            </Button>
          </div>
          
          <div className="space-y-4">
            {quizQuestions.map((q, qIndex) => {
              const userAnswer = answers[qIndex];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div 
                  key={q.id} 
                  className={`p-4 rounded-xl border ${
                    isCorrect ? 'border-success/30 bg-success/5' : 'border-destructive/30 bg-destructive/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCorrect ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {qIndex + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-3">{q.question}</p>
                      <div className="grid gap-2">
                        {q.options.map((option, oIndex) => {
                          const isUserAnswer = userAnswer === oIndex;
                          const isCorrectAnswer = q.correctAnswer === oIndex;
                          
                          return (
                            <div 
                              key={oIndex}
                              className={`px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                                isCorrectAnswer 
                                  ? 'bg-success/20 text-success border border-success/30' 
                                  : isUserAnswer 
                                  ? 'bg-destructive/20 text-destructive border border-destructive/30'
                                  : 'bg-muted/30 text-muted-foreground'
                              }`}
                            >
                              <span>{option}</span>
                              {isCorrectAnswer && <CheckCircle2 className="w-4 h-4" />}
                              {isUserAnswer && !isCorrectAnswer && <XCircle className="w-4 h-4" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={restartQuiz} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button variant="hero" onClick={() => onComplete(result)} className="flex-1">
              Continue Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Result Screen
  if (showResult) {
    const result = calculateFinalResult();
    const feedback = getRandomFeedback(result.learningLevel);
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          {/* Score Circle */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-6 ${
              result.percentage >= 71 ? 'bg-success/15 ring-4 ring-success/20' :
              result.percentage >= 41 ? 'bg-primary/15 ring-4 ring-primary/20' : 
              'bg-beginner/15 ring-4 ring-beginner/20'
            }`}
          >
            <span className={`text-4xl font-display font-bold ${
              result.percentage >= 71 ? 'text-success' :
              result.percentage >= 41 ? 'text-primary' : 'text-beginner'
            }`}>
              {result.percentage}%
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Quiz Complete! 🎉
            </h2>
            <p className="text-muted-foreground mb-4">
              You answered <span className="font-semibold text-foreground">{result.score}</span> out of <span className="font-semibold text-foreground">{result.totalQuestions}</span> questions correctly
            </p>
          </motion.div>
          
          {/* Learning Level Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 ${
              result.learningLevel === 'advanced' ? 'bg-success/15 text-success' :
              result.learningLevel === 'intermediate' ? 'bg-primary/15 text-primary' : 
              'bg-beginner/15 text-beginner'
            }`}
          >
            {result.learningLevel === 'advanced' && <Sparkles className="w-4 h-4" />}
            {result.learningLevel === 'intermediate' && <Target className="w-4 h-4" />}
            {result.learningLevel === 'beginner' && <Brain className="w-4 h-4" />}
            <span className="font-semibold capitalize">
              {result.learningLevel} Level
            </span>
          </motion.div>
          
          {/* AI Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 mb-6 border border-primary/10"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground mb-1">AI Learning Assistant</p>
                <p className="text-sm text-muted-foreground">{feedback}</p>
              </div>
            </div>
          </motion.div>

          {/* Score Breakdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-2xl font-bold text-foreground">{result.score}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-2xl font-bold text-foreground">{result.totalQuestions - result.score}</p>
              <p className="text-xs text-muted-foreground">Incorrect</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3">
              <p className="text-2xl font-bold text-foreground">{result.totalQuestions}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button 
              variant="outline" 
              onClick={() => setShowReview(true)}
              className="flex-1"
            >
              Review Answers
            </Button>
            <Button 
              variant="outline" 
              onClick={restartQuiz}
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
            <Button 
              variant="hero" 
              onClick={() => onComplete(result)}
              className="flex-1"
            >
              Start Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Quiz Screen
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2.5" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card rounded-2xl border border-border p-6 md:p-8"
        >
          {/* Difficulty Badge */}
          <div className="mb-6 flex items-center justify-between">
            <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
              question.difficulty === 'beginner' ? 'bg-beginner/15 text-beginner' :
              question.difficulty === 'intermediate' ? 'bg-primary/15 text-primary' :
              'bg-success/15 text-success'
            }`}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              1 point
            </span>
          </div>
          
          <h2 className="text-lg md:text-xl font-display font-semibold text-foreground mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showCorrect = isAnswered && isCorrect;
              const showWrong = isAnswered && isSelected && !isCorrect;
              const optionLetter = String.fromCharCode(65 + index); // A, B, C, D

              return (
                <motion.button
                  key={index}
                  whileHover={!isAnswered ? { scale: 1.01 } : {}}
                  whileTap={!isAnswered ? { scale: 0.99 } : {}}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-4 ${
                    showCorrect 
                      ? 'border-success bg-success/10' 
                      : showWrong 
                      ? 'border-destructive bg-destructive/10'
                      : isSelected 
                      ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  {/* Option Letter */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    showCorrect 
                      ? 'bg-success text-white' 
                      : showWrong 
                      ? 'bg-destructive text-white'
                      : isSelected 
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {optionLetter}
                  </div>
                  
                  <span className={`flex-1 ${
                    showCorrect ? 'text-success font-medium' :
                    showWrong ? 'text-destructive' :
                    isSelected ? 'text-primary font-medium' :
                    isAnswered && !isSelected && !isCorrect ? 'text-muted-foreground' : 
                    'text-foreground'
                  }`}>
                    {option}
                  </span>
                  
                  {showCorrect && <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />}
                  {showWrong && <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* Confirm Button */}
          {!isAnswered && (
            <Button
              variant="hero"
              size="lg"
              className="w-full mt-6"
              onClick={handleConfirmAnswer}
              disabled={selectedAnswer === null}
            >
              Confirm Answer
            </Button>
          )}

          {/* Feedback after answer */}
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-xl ${
                selectedAnswer === question.correctAnswer 
                  ? 'bg-success/10 border border-success/30' 
                  : 'bg-destructive/10 border border-destructive/30'
              }`}
            >
              <p className={`text-sm font-medium ${
                selectedAnswer === question.correctAnswer ? 'text-success' : 'text-destructive'
              }`}>
                {selectedAnswer === question.correctAnswer 
                  ? "✓ Correct! Great job!" 
                  : `✗ Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Moving to next question...
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
