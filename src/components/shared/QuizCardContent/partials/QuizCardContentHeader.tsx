interface IQuizCardContentHeaderProps {
  snippet: string;
  timeRemaining: number;
  className?: string;
}

const QuizCardContentHeader: React.FC<IQuizCardContentHeaderProps> = ({
  snippet,
  timeRemaining,
  className,
}) => (
  <div className={className}>
    <span>{snippet}</span>
    <span style={{ float: 'right' }}>{timeRemaining}</span>
  </div>
);

export default QuizCardContentHeader;
