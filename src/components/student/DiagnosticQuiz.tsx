import { useState } from 'react';
import { QuizQuestion, QuizResult } from '@/types/learning';
import { diagnosticQuiz } from '@/data/quizData';
import { calculateLearningLevel } from '@/lib/learningUtils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface DiagnosticQuizProps {
  onComplete: (result: QuizResult) => void;
}

export function DiagnosticQuiz({ onComplete }: DiagnosticQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = diagnosticQuiz[currentQuestion];
  const progress = ((currentQuestion + 1) / diagnosticQuiz.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswered(true);
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    // Auto-advance after a delay
    setTimeout(() => {
      if (currentQuestion < diagnosticQuiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // Calculate final result
        const score = newAnswers.reduce((acc, ans, idx) => {
          return acc + (ans === diagnosticQuiz[idx].correctAnswer ? 1 : 0);
        }, 0);
        const percentage = Math.round((score / diagnosticQuiz.length) * 100);
        
        setShowResult(true);
      }
    }, 1500);
  };

  const calculateFinalResult = (): QuizResult => {
    const score = answers.reduce((acc, ans, idx) => {
      return acc + (ans === diagnosticQuiz[idx].correctAnswer ? 1 : 0);
    }, 0);
    const percentage = Math.round((score / diagnosticQuiz.length) * 100);
    
    return {
      score,
      totalQuestions: diagnosticQuiz.length,
      percentage,
      learningLevel: calculateLearningLevel(percentage),
      answers
    };
  };

  if (showResult) {
    const result = calculateFinalResult();
    
    return (
      <div className="max-w-2xl mx-auto animate-scale-in">
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
            result.percentage >= 71 ? 'bg-success/15' :
            result.percentage >= 41 ? 'bg-primary/15' : 'bg-beginner/15'
          }`}>
            <span className={`text-4xl font-display font-bold ${
              result.percentage >= 71 ? 'text-success' :
              result.percentage >= 41 ? 'text-primary' : 'text-beginner'
            }`}>
              {result.percentage}%
            </span>
          </div>
          
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Quiz Complete!
          </h2>
          <p className="text-muted-foreground mb-6">
            You answered {result.score} out of {result.totalQuestions} questions correctly
          </p>
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
            result.learningLevel === 'advanced' ? 'bg-success/15 text-success' :
            result.learningLevel === 'intermediate' ? 'bg-primary/15 text-primary' : 
            'bg-beginner/15 text-beginner'
          }`}>
            <span className="font-semibold capitalize">
              {result.learningLevel} Level
            </span>
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {result.learningLevel === 'beginner' && 
                "We'll start with the fundamentals to build a strong foundation."}
              {result.learningLevel === 'intermediate' && 
                "You have good basics! Let's strengthen your understanding."}
              {result.learningLevel === 'advanced' && 
                "Excellent! You're ready for challenging content."}
            </p>
            
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => onComplete(result)}
              className="mt-6"
            >
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestion + 1} of {diagnosticQuiz.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-2xl border border-border p-8 animate-fade-in" key={currentQuestion}>
        <div className="mb-6">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            question.difficulty === 'beginner' ? 'bg-beginner/15 text-beginner' :
            question.difficulty === 'intermediate' ? 'bg-primary/15 text-primary' :
            'bg-success/15 text-success'
          }`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        </div>
        
        <h2 className="text-xl font-display font-semibold text-foreground mb-6">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = isAnswered && isCorrect;
            const showWrong = isAnswered && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border text-left transition-all duration-200 ${
                  showCorrect 
                    ? 'border-success bg-success/10 text-success' 
                    : showWrong 
                    ? 'border-destructive bg-destructive/10 text-destructive'
                    : isSelected 
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={isAnswered && !isSelected && !isCorrect ? 'text-muted-foreground' : ''}>
                    {option}
                  </span>
                  {showCorrect && <CheckCircle2 className="w-5 h-5 text-success" />}
                  {showWrong && <XCircle className="w-5 h-5 text-destructive" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Button */}
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

        {isAnswered && (
          <div className="mt-6 p-4 rounded-xl bg-muted/50">
            <p className="text-sm text-muted-foreground">
              {selectedAnswer === question.correctAnswer 
                ? "✓ Correct! Moving to next question..." 
                : `✗ The correct answer was: ${question.options[question.correctAnswer]}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
