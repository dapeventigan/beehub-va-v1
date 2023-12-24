import { Outlet } from "react-router-dom";

const RootLayouts = () => {
  return (
    <div className="root__layout">
      <Outlet />
    </div>
  );
};

export default RootLayouts;
