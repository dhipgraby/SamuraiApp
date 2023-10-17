import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Input = ({ text, poolId }: any) => {
  return (
    <div className="bg-black relative">
      <label htmlFor={text} className="sr-only">
        {text}
      </label>
      <input
        type={"number"}
        id={text}
        placeholder={text}
        className="w-full rounded-lg border-2 py-2.5 pe-10 sm:text-sm bg-black text-white overflow-hidden"
        min={0}
      />
      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="button" className="text-white hover:text-gray-700">
          <p className="sr-only">Search</p>
          <FontAwesomeIcon className="text-yellow-400" icon={faPaperPlane} />
        </button>
      </span>
    </div>
  );
};

export default Input;
