interface EditCriteriaProps {
  isOpen: boolean;
  onClickClose: () => void;
  children?: React.ReactNode;
  title?: string;
}

export const EditCriteria: React.FC<EditCriteriaProps> = (props) => {
  const { isOpen: open, onClickClose, children, title } = props;

  // if (data) {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${open ? 'block' : 'hidden'}`}>
      <div className="absolute left-1/2 top-1/2 md:w-[80%] transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white p-8 rounded-lg shadow-md border">
          {/* Close Button */}
          <button className="absolute top-2 right-2 text-gray-400 hover:text-black p-2" onClick={onClickClose}>
            X
          </button>
          <h2 className="text-lg font-semibold mb-3 text-gray-500">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  )
  // }
  // return null

}
