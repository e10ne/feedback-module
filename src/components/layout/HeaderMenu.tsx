import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { currentUser } from "../../utils/currentUser";

interface HeaderMenuProps {}

const HeaderMenu: React.FC<HeaderMenuProps> = ({}) => {
  const [user, setUser] = useState<string | undefined>();
  currentUser(setUser);
  // console.log("user: ", user);
  if (user === "medient") {
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
          <NextLink
            href={"/create-feedback"}
            shallow={true}
          >
            <MenuItem>Feedback aanmaken</MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
    );
  } else if (user === "admin") {
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
          <NextLink
            href={"/admin"}
            shallow={true}
          >
            <MenuItem>Naar admin pagina</MenuItem>
          </NextLink>
          <MenuDivider />
          <NextLink
            href={"/create-feedback"}
            shallow={true}
          >
            <MenuItem>Feedback aanmaken</MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
    );
  } else {
    return (
      <NextLink
        href="/login"
        shallow={true}
      >
        <Button bgColor={"button"}>Inloggen</Button>
      </NextLink>
    );
  }

  // if (!user) {
  //   body = <Text>inloggen</Text>;
  // } else if (user === "medient") {
  //   body = <Text>Medient</Text>;
  // } else if (user === "admin") {
  //   body = <Text>Admin</Text>;
  // }
};

export default HeaderMenu;
