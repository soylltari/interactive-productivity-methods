export default function MethodCard({ method }) {
  return (
    <div className="main-gradient p-[2px] rounded-3xl w-80 hover:shadow-[0px_4px_14px_0_rgba(147,197,253,.70)] transition-all">
      <div className="bg-gray-50 rounded-[1.4rem] cursor-pointer w-full min-h-86 flex flex-col">
        <div className="h-48 flex items-center justify-center p-4">
          <img
            src={method.icon}
            alt={method.id}
            className="h-32 w-32 object-contain"
          />
        </div>
        <div className="w-full h-[2px] bg-gray-200"></div>
        <div className="px-6 py-6 text-left flex-1">
          <h2>{method.name}</h2>
          <ul className="flex flex-wrap mt-4 gap-2">
            {method.tags.map((tag, id) => (
              <li
                key={id}
                className="capitalize text-sm bg-blue-300 rounded-full px-2"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
