import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";

export default function ClaimBtn() {
    return (
        <div>
            <div className={`mt-4 text-center`}>
                <button
                    className={`bg-white text-black p-3 rounded-lg text-lg`}
                >
                    Claim 100 Yen Tokens <FontAwesomeIcon icon={faRocket} />
                </button>
            </div>
        </div>
    );

}
