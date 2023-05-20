const ApplicationsView = ({ isIntern }) => {
  return (
    <>
      <h1>{ isIntern ? 'Заявки от стажёров' : 'Заявки от кандидатов' }</h1>
    </>
  );
};

export default ApplicationsView;
