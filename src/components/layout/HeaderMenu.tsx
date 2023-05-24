import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  useLogoutMutation,
  useMeQuery,
} from "../../../graphql/generated/graphql";
import { useRouter } from "next/router";

const HeaderMenu: React.FC<{}> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const router = useRouter();
  if (!fetching && data?.me?.username === "medient") {
    return (
      <Menu>
        <MenuButton
          as={Button}
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
          <MenuDivider />
          <MenuItem
            onClick={async () => {
              const { error } = await logout({});
              if (!error) router.push("/");
            }}
          >
            log uit
          </MenuItem>
        </MenuList>
      </Menu>
    );
  } else if (!fetching && data?.me?.username === "admin") {
    return (
      <Menu>
        <MenuButton
          as={Button}
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
          <MenuDivider />
          <MenuItem
            onClick={async () => {
              const { error } = await logout({});
              if (!error) {
                router.push("/");
              }
            }}
          >
            log uit
          </MenuItem>
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
