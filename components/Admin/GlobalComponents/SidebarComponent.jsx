//next
import Link from "next/link";

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
import { MdOutlineWorkspaces } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { FaHandsHelping } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { GiAnvilImpact } from "react-icons/gi";

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
                <img
                  src="/images/logo.png"
                  width="160"
                  height="80"
                  alt="habitat_logo"
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

          {/* Services */}
          <SubMenu
            title={"Services"}
            icon={<MdOutlineWorkspaces style={{ fontSize: "20" }} />}
          >
            <MenuItem>
              Add Service
              <Link href="/admin/services/create" />
            </MenuItem>
            <MenuItem>
              Service List
              <Link href="/admin/services" />
            </MenuItem>
          </SubMenu>

          {/* Impacts */}
          <SubMenu
            title={"Impacts"}
            icon={<GiAnvilImpact style={{ fontSize: "20" }} />}
          >
            <MenuItem>
              Add Impact
              <Link href="/admin/impacts/create" />
            </MenuItem>
            <MenuItem>
              Impact List
              <Link href="/admin/impacts" />
            </MenuItem>
          </SubMenu>

          {/* Reports */}
          <SubMenu
            title={"Reports"}
            icon={<BiSolidReport style={{ fontSize: "20" }} />}
          >
            <MenuItem>
              Create Report
              <Link href="/admin/reports/create" />
            </MenuItem>
            <MenuItem>
              Report List
              <Link href="/admin/reports" />
            </MenuItem>
          </SubMenu>

          {/* Pledges */}
          <SubMenu
            title={"Pledges"}
            icon={<FaHandsHelping style={{ fontSize: "20" }} />}
          >
            <MenuItem>
              Create Pledge
              <Link href="/admin/pledges/create" />
            </MenuItem>
            <MenuItem>
              Pledge List
              <Link href="/admin/pledges" />
            </MenuItem>
          </SubMenu>

          {/* Subscribers */}
          <SubMenu
            title={"Subscribers"}
            icon={<IoPeople style={{ fontSize: "20" }} />}
          >
            <MenuItem>
              Subscriber List
              <Link href="/admin/subscribers" />
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
