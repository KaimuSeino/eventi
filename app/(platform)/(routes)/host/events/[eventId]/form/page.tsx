const FormPage = ({
  params
}: {
  params: { eventId: string }
}) => {
  return (
    <div>
      {params.eventId}
    </div>
  );
}

export default FormPage;