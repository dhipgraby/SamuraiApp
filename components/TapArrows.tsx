import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons"

type ArrowProps = { showPanel: boolean }
export default function TapArrows({ showPanel }: ArrowProps) {
    return (
        <span className="mr-2">
            <FontAwesomeIcon icon={(showPanel) ? faChevronDown : faChevronRight} />
        </span>
    )
}
