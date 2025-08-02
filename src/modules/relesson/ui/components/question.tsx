

export const Question = ({ question }: { question?: string }) => {

  return (
    <div className="text-2xl font-semibold text-blue-950">
      <h1 className="text-black">Question : </h1>
      <h1>
        {question}{" "}?
      </h1>
    </div>
  )
}
