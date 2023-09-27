import { useState } from "react";
import Link from "next/link";

//react-bootstrap
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

//redux
import { useDispatch } from "react-redux";
import { menuPath } from "../../store/actions/menu";

const RenderMenuItems = ({
  menuData,
  menuList,
  isChild = false,
  path = [],
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (itemId) => {
    setOpenDropdown(itemId);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  //redux
  const dispatch = useDispatch();

  //set-path-redux
  const change = () => {
    dispatch(menuPath(path));
  };

  // Sort menuData based on serial integer attribute
  menuData.sort((a, b) => a.serial - b.serial);

  return menuData.map((item) => {
    const hasChildren = menuList.some((child) => child.parent_id === item.id);
    const isTopLevelItem = !item.parent_id;

    // Create a new path array by adding the current item's name to the existing path
    const newPath = [...path, item.name];

    if (hasChildren) {
      const children = menuList.filter((child) => child.parent_id === item.id);
      return (
        <NavDropdown
          key={item.id}
          title={item.name}
          id={`dropdown-${item.id}`}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
          show={openDropdown === item.id}
          drop={isChild ? "end" : undefined}
          className={isChild ? "" : "mt-lg-4 ms-lg-3 me-lg-3"}
        >
          <RenderMenuItems
            menuData={children}
            menuList={menuList}
            isChild={true}
            path={newPath} // Pass the updated path
          />
        </NavDropdown>
      );
    } else {
      if (isTopLevelItem) {
        return (
          <Link
            key={item.id}
            href={`/menus/${item.slug}`}
            onClick={change}
            className={
              isChild
                ? "mt-2 navbar-nav-item-top"
                : "mt-lg-4 ms-lg-3 me-lg-3 navbar-nav-item-top"
            }
          >
            {item.name}
          </Link>
        );
      } else {
        return (
          <Nav.Item
            key={item.id}
            className={isChild ? "mt-2" : "mt-lg-4 ms-lg-3 me-lg-3"}
          >
            <Link
              href={`/menus/${item.slug}`}
              className="navbar-nav-item"
              onClick={change}
            >
              {item.name}
            </Link>
          </Nav.Item>
        );
      }
    }
  });
};

export default RenderMenuItems;
