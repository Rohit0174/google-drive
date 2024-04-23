import { Breadcrumb } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const BreadCrumb = () => {
  const location = useLocation();
  const { pathname } = location;
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const pathParts = pathname.split("/").filter((part) => part !== "");

    const items = [
      {
        title: "Home",
        href: "/",
      },
    ];

    let currentPath = "/";
    pathParts.forEach((part, index) => {
      const isLastPart = index === pathParts.length - 1;
      // Append the part with a slash if it's not the last part
      currentPath += `${isLastPart ? part : part + "/"}`;
      items.push({
        title: decodeURIComponent(part),
        href: currentPath,
      });
    });

    setBreadcrumbItems(items);
  }, [pathname]);

  return (
    <Breadcrumb>
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.href ? <Link to={item.href}>{item.title}</Link> : item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;
