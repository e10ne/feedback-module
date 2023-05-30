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
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { MdLogout } from "react-icons/md";

const HeaderMenu: React.FC<{}> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [, logout] = useLogoutMutation();
  const router = useRouter();
  if (!fetching && data?.me?.username === "medient") {
    return (
      <Menu variant={"main"}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              variant={"menu"}
              _hover={{ bgColor: "#F9A412" }}
              rightIcon={
                isOpen ? (
                  <ChevronUpIcon fontSize={"2xl"} />
                ) : (
                  <ChevronDownIcon fontSize={"2xl"} />
                )
              }
            >
              Medient
            </MenuButton>
            <MenuList>
              <NextLink href={"/create-feedback"}>
                <MenuItem>Feedback aanmaken</MenuItem>
              </NextLink>
              <MenuDivider />
              <MenuItem
                icon={<MdLogout fontSize={"1.2rem"} />}
                onClick={async () => {
                  const { error } = await logout({});
                  if (!error) router.push("/");
                }}
              >
                log uit
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    );
  } else if (!fetching && data?.me?.username === "admin") {
    return (
      <Menu variant={"main"}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              variant={"menu"}
              _hover={{ bgColor: "#F9A412" }}
              rightIcon={
                isOpen ? (
                  <ChevronUpIcon fontSize={"2xl"} />
                ) : (
                  <ChevronDownIcon fontSize={"2xl"} />
                )
              }
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
                icon={<MdLogout fontSize={"1.2rem"} />}
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
          </>
        )}
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
