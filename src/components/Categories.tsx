import { Button } from "@chakra-ui/react";
import { ComponentProps } from "react";
import { useMatch } from "react-router";
import { Link } from "react-router-dom";
import {
  CATEGORY_ALL,
  CATEGORY_OTHERS,
  sortCategories,
  useCategories,
} from "../api/useCategories";

export const Categories = ({
  showAll,
  useAlternativeNaming,
  ...props
}: Omit<ComponentProps<typeof Button>, "children"> & { showAll?: boolean, useAlternativeNaming?: boolean }) => {
  const match = useMatch("/category/:category");
  const isTop = useMatch("/");

  const category = match?.params.category ?? (isTop ? CATEGORY_ALL : null);
  const categories = useCategories(useAlternativeNaming);

  return (
    <>
      {showAll !== false ? (
        <Button
          variant={CATEGORY_ALL === category ? "solid" : "ghost"}
          {...props}
          as={Link}
          to="/"
        >
          {categories.get(CATEGORY_ALL) ?? CATEGORY_ALL}
        </Button>
      ) : null}
      {sortCategories(categories).map(({ id, name }) => {
        return (
          <Button
            variant={id === category ? "solid" : "ghost"}
            {...props}
            as={Link}
            to={`/category/${id}`}
            key={id}
          >
            {name}
          </Button>
        );
      })}
      <Button
        variant={CATEGORY_OTHERS === category ? "solid" : "ghost"}
        {...props}
        as={Link}
        to={`/category/${CATEGORY_OTHERS}`}
      >
        {categories.get(CATEGORY_OTHERS) ?? CATEGORY_OTHERS}
      </Button>
    </>
  );
};
