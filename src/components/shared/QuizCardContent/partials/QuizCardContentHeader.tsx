interface IQuizCardContentHeaderProps {
  snippet: string;
  timeRemaining: number;
}

const QuizCardContentHeader: React.FC<IQuizCardContentHeaderProps> = ({
  snippet,
  timeRemaining,
}) => (
  <>
    <span>{snippet}</span>
    <span style={{ float: 'right' }}>{timeRemaining}</span>
  </>
);

export default QuizCardContentHeader;
