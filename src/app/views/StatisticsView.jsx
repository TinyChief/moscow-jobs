const StatisticsView = ({ isIntern }) => {
  return (
    <>
      <h1>{ isIntern ? 'Статистика по стажёрам' : 'Статистика по кандидатам' }</h1>
    </>
  );
};

export default StatisticsView;
