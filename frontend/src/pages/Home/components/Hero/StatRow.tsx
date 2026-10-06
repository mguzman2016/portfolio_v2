type StatRowProps = {
  textLeft: string
  textRight: string
}

const StatRow = ( { textLeft, textRight }: StatRowProps ) => {
  return (
    <div className="flex justify-between gap-4 py-3.5 font-mono text-xs">
        <span className="text-muted shrink-0">{textLeft}</span>
        <span className="text-right">{textRight}</span>
    </div>
  )
}

export default StatRow;
