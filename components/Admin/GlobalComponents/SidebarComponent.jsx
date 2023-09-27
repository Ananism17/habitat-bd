//next
import Link from "next/link";
import Image from "next/image";

//pro-sidebar
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//react-icons
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaGlobe } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { BiPhotoAlbum } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import { TfiLayoutSlider } from "react-icons/tfi";
import { GiNewspaper } from "react-icons/gi";

const SidebarComponent = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: "9px",
                }}
              >
                <Image
                  src="/images/logo.png"
                  width={160}
                  height={80}
                  alt="logo"
                />
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<GoHome style={{ fontSize: "20" }} />}>
            Dashboard
            <Link href="/admin" />
          </MenuItem>

          {/* Albums */}
          <SubMenu
            title={"Albums"}
            icon={<BiPhotoAlbum style={{ fontSize: "20" }} />}
          >
            <SubMenu title={"Photo Albums"}>
              <MenuItem>
                Create Photo Album
                <Link href="/admin/albums/photo-albums/create" />
              </MenuItem>
              <MenuItem>
                Photo Album List
                <Link href="/admin/albums/photo-albums" />
              </MenuItem>
            </SubMenu>
            <SubMenu title={"Video Albums"}>
              <MenuItem>
                Add Video
                <Link href="/admin/albums/video-albums/create" />
              </MenuItem>
              <MenuItem>
                Video List
                <Link href="/admin/albums/video-albums" />
              </MenuItem>
            </SubMenu>
          </SubMenu>

          {/* Pages */}
          <SubMenu
            title={"Pages"}
            icon={<CgWebsite style={{ fontSize: "20" }} />}
          >
            <MenuItem>
              Create Page
              <Link href="/admin/pages/create" />
            </MenuItem>
            <MenuItem>
              Page List
              <Link href="/admin/pages" />
            </MenuItem>
            <SubMenu title={"Page Contents"}>
              <MenuItem>
                Create Page Content
                <Link href="/admin/pages/page-contents/create" />
              </MenuItem>
              <MenuItem>
                Page Content List
                <Link href="/admin/pages/page-contents" />
              </MenuItem>
            </SubMenu>
          </SubMenu>

          {/* Content */}
          <SubMenu
            title={"Contents"}
            icon={<GiNewspaper style={{ fontSize: "20" }} />}
          >
            <MenuItem>
              Create Content
              <Link href="/admin/contents/create" />
            </MenuItem>
            <MenuItem>
              Content List
              <Link href="/admin/contents" />
            </MenuItem>
          </SubMenu>

          {/* Slider */}
          <SubMenu
            title={"Slider Images"}
            icon={<TfiLayoutSlider style={{ fontSize: "20" }} />}
          >
            <MenuItem>
              Add Slider Image
              <Link href="/admin/sliders/create" />
            </MenuItem>
            <MenuItem>
              Slider Image List
              <Link href="/admin/sliders" />
            </MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "16px" }}>
          <Link className="sidebar-btn" style={{ cursor: "pointer" }} href="/">
            <FaGlobe />
            <span>WEBSITE</span>
          </Link>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SidebarComponent;
