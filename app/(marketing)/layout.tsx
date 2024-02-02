

const LPLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="overflow-y-hidden">
      {children}
    </div>
  )
}

export default LPLayout