import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MeQuery } from "../../../graphql/generated/graphql";

interface HeaderMenuProps {
  fetching: boolean;
  data: MeQuery | undefined;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ data, fetching }) => {
  if (!fetching && data?.me?.username === "medient") {
    return (
      <Menu>
        <MenuButton
          bgColor={"button"}
          px={4}
          py={2}
        >
          Medient
        </MenuButton>
        <MenuList>
          <NextLink href={"/create-feedback"}>
            <MenuItem>Feedback aanmaken</MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
    );
  } else if (!fetching && data?.me?.username === "admin") {
    return (
      <Menu>
        <MenuButton
          bgColor={"button"}
          px={4}
          py={2}
        >
          Admin
        </MenuButton>
        <MenuList>
          <NextLink href={"/admin"}>
            <MenuItem>Naar admin pagina</MenuItem>
          </NextLink>
          <MenuDivider />
          <NextLink href={"/create-feedback"}>
            <MenuItem>Feedback aanmaken</MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
    );
  } else {
    return (
      <NextLink href="/login">
        <Button bgColor={"button"}>Inloggen</Button>
      </NextLink>
    );
  }
};

export default HeaderMenu;
