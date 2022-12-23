import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../httpUtils";
import { Loading } from "./Loading";
import { ProcessedSpecialGroup, DropdownFilter } from "../types";

//Assets
import plus from "../assets/plus.svg";
import x from "../assets/greenX.svg";
import alert from "../assets/alert.svg";
import check from "../assets/check.svg";
import { useAuth } from "../contexts/AuthContext";

// Show/Hide dropdown, clear button, and messages
function showHideElements() {
  const input = document.getElementById(
    "specialGroupInput"
  ) as HTMLInputElement;
  const dropdown = document.getElementById("specialGroupDropdown");
  const clearButton = document.getElementById("clearBtn");
  const alertMessage = document.getElementById("alreadyRegisteredMessage");
  const readyMessage = document.getElementById("readyToRegisterMessage");

  if (
    dropdown != null &&
    clearButton != null &&
    alertMessage != null &&
    readyMessage != null
  ) {
    alertMessage.style.display = "none";
    readyMessage.style.display = "none";

    if (input.value === "") {
      dropdown.style.display = "block";
      clearButton.style.display = "block";
    } else {
      dropdown.style.display = "block";
      clearButton.style.display = "block";
    }
  }
}
interface Props {
  specialGroupsList: ProcessedSpecialGroup[];
  isGroupSelected: boolean;
  setIsGroupSelected: (group: string | null) => void;
}

export const SpecialGroupDropdown: React.FC<Props> = ({
  specialGroupsList,
  isGroupSelected,
  setIsGroupSelected,
}) => {
  //TODO: Make this work
  // Get allEventIds from ViewEvent
  const location = useLocation();
  const allEventIds = location.state;
  console.log("allEventIds", allEventIds);

  const [searchQuery, setSearchQuery] = useState<string>("");

  // Create list of all event ids associated with event
  const eventIdsList: string[] = [];
  for (const k in allEventIds) {
    eventIdsList.push(allEventIds[k]);
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row md:gap-8">
      <p className="shrink-0 font-bold text-newLeafGreen lg:text-xl">
        Group Name:
      </p>
      <div className="relative w-64 grow md:w-80">
        <div className="flex h-8 w-full rounded-lg border-2 border-softGrayWhite px-2">
          <input
            className="grow text-newLeafGreen placeholder:text-newLeafGreen placeholder:text-opacity-40 focus:outline-none md:text-lg md:placeholder:text-lg"
            type="text"
            id="specialGroupInput"
            autoComplete="off"
            placeholder="Search through groups..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsGroupSelected(null);
            }}
          />

          {/* Clear button */}
          <button
            onClick={() => {
              setSearchQuery("");
              setIsGroupSelected(null);
            }}
            className="w-4 "
          >
            <img
              className={searchQuery.length === 0 ? "hidden" : "block"}
              src={x}
              alt="x"
            />
          </button>
          {/* )} */}
        </div>

        {/* Special Group Listing Dropdown */}
        {!isGroupSelected && (
          <ul className="absolute max-h-56 w-full overflow-y-scroll rounded-lg border-2 border-t-0 border-softGrayWhite bg-softBeige p-1  text-newLeafGreen">
            <div className="px-2 text-sm text-[#0E7575]">
              Select existing group or create new one
            </div>
            {specialGroupsList
              .filter((specialGroup) => {
                //Filter based on search query
                return (
                  specialGroup.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  searchQuery
                    .toLowerCase()
                    .includes(specialGroup.name.toLowerCase())
                );
              })
              .map((specialGroup, idx) => {
                return (
                  <li
                    className="flex flex-row rounded-lg px-2 py-1 hover:cursor-pointer hover:bg-softGrayWhite"
                    key={idx + specialGroup.name}
                    onClick={() => {
                      setSearchQuery(specialGroup.name);
                      setIsGroupSelected(specialGroup.name);
                    }}
                  >
                    <img className="mr-2 w-4" src={plus} alt="plus-icon" />
                    {specialGroup.name}
                  </li>
                );
              })}

            <li
              className="flex flex-row rounded-lg px-2 hover:cursor-pointer hover:bg-softGrayWhite"
              onClick={() => {
                setIsGroupSelected(searchQuery);
              }}
            >
              Create:
              <p className="pl-2 text-[#0E7575]">{searchQuery}</p>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
