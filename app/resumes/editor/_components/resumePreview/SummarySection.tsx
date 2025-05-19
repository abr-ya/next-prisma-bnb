interface IPersonalInfoHeader {
  color: string;
  summary?: string;
}

const SummarySection = ({ color, summary }: IPersonalInfoHeader) =>
  summary ? (
    <>
      <hr
        className="border-2"
        style={{
          borderColor: color,
        }}
      />
      <div className="break-inside-avoid space-y-3">
        <p className="text-lg font-semibold" style={{ color }}>
          Professional profile
        </p>
        <div className="whitespace-pre-line text-sm">{summary}</div>
      </div>
    </>
  ) : (
    <p>summary is empty</p>
  );

export default SummarySection;
