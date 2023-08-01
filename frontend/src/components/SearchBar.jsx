import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { FcSearch } from "react-icons/fc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ width, size, display }) => {
  const inputBgColor = useColorModeValue("gray.200", "#413F42");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyUp = (event) => {
    if (event.key === "Enter" && searchQuery.length > 0) {
      navigate(`/search/${searchQuery.toLocaleLowerCase()}`);
    }
  };

  return (
    <InputGroup
      w={width}
      display={display}
      bg={inputBgColor}
      borderRadius="md"
      size={size}
    >
      <InputLeftElement color="gray.500">
        <FcSearch size="20px" />
      </InputLeftElement>
      <Input
        placeholder="Search for People..."
        focusBorderColor="transparent"
        _dark={{
          _placeholder: { color: "grey.400" },
        }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={handleKeyUp}
      />
    </InputGroup>
  );
};

export default SearchBar;
