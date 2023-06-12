const ErrorAlert = ({ errorInfo }: { errorInfo: String | undefined }) => {
  return (
    <div role="alert" className="my-1">
      <div className="border border-red-400 rounded-b bg-red-100 px-4 py-1 text-red-700">
        <p>{errorInfo}</p>
      </div>
    </div>
  );
};

export default ErrorAlert;
